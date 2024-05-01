"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: number;
  testId: number;
};

type TestDetails = {
  id: number;
  title: string;
  description: string;
  duration: number;
  price: number;
  startAt: Date;
  userId: string;

  questions: Question[];
};

export async function createTest({
  testDetails,
}: {
  testDetails: TestDetails | undefined;
}) {
  try {
    console.log(testDetails);
    const { userId } = auth();
    console.log(userId);

    if (testDetails) {
      const res = await db.test.create({
        data: {
          title: testDetails.title,
          description: testDetails.description,
          duration: testDetails.duration,
          startAt: testDetails.startAt,
          userId: userId as string,
          price: testDetails?.price,
          questions: {
            create: testDetails.questions.map((question) => ({
              question: question.question,
              options: question.options,
              answer: question.answer,
            })),
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
    console.error(error);
  }
  redirect("/dashboard/test");
}

export async function updateTest({
  testDetails,
}: {
  testDetails: TestDetails | undefined;
}) {
  try {
    const { userId } = auth();
    const testId = testDetails?.id;
    if (testDetails) {
      const updatedTest = await db.test.update({
        where: { id: testId },
        data: {
          title: testDetails.title,
          description: testDetails.description,
          duration: testDetails.duration,
          startAt: testDetails.startAt,
          userId: userId as string,
        },
      });

      testDetails.questions.forEach(async (question) => {
        if (question.id) {
          await db.question.update({
            where: { id: question.id },
            data: {
              question: question.question,
              options: question.options,
              answer: question.answer,
            },
          });
        } else {
          await db.question.create({
            data: {
              question: question.question,
              options: question.options,
              answer: question.answer,
              testId: updatedTest.id,
            },
          });
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
  redirect("/dashboard/test");
}

export async function deleteTest(id: number) {
  console.log(id);
  try {
    await db.question.deleteMany({
      where: {
        testId: id,
      },
    });

    await db.test.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log("Error in deleting the test", error);
    console.error(error);
  }
  redirect("/dashboard/test");
}

export async function getAllTests() {
  try {
    const tests = await db.test.findMany();
    return tests;
  } catch (error) {
    console.error(error);
  }
}
export async function getSpecificTest(testId: number) {
  console.log(testId);
  try {
    const test = await db.test.findUnique({
      where: {
        id: testId,
      },
      include: {
        questions: true,
      },
    });
    console.log(test);
    return test;
  } catch (error) {
    console.log("Error in fetching the test", error);
    console.error(error);
  }
}

export async function getTestsByUserId(userId: string) {
  const userWithTests = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      test: true,
    },
  });
  return userWithTests ? userWithTests.test : [];
}


export async function getPublishedTests(userId: string) {
  try {
    const tests = await db.test.findMany({
      where: {
        published: true,
      },
      include: {
        user: true,
      },
    });

    const payments = await db.payment.findMany({
      where: {
        userId: userId,
        status: "completed",
      },
      select: {
        testId: true,
      },
    });

    const purchasedTestIds = new Set(payments.map((payment) => payment.testId));

    const testsWithPurchaseStatus = tests.map((test) => {
      return {
        ...test,
        purchased: purchasedTestIds.has(test.id),
      };
    });

    return testsWithPurchaseStatus;
  } catch (error) {
    console.error(error);
  }
}

export async function publishTest(testId: number, formData: FormData) {
  console.log(testId);
  try {
    const updatedTest = await db.test.update({
      where: { id: testId },
      data: { published: true },
    });
    console.log(`Test ${testId} published successfully`);
  } catch (error) {
    console.error(`Error publishing test ${testId}`, error);
  }
  revalidatePath("/dashboard/test");
}


//payments total countss

export async function getTotalEarningsByInstructor(userId: string) {
  try {
    const payments = await db.payment.findMany({
      where: {
        test: {
          userId: userId,
        },
        status: "completed",
      },
    });

    const totalEarnings = payments.reduce((total, payment) => total + payment.amount, 0);
    return totalEarnings;
  } catch (error) {
    console.error(error);
  }
}

export async function getTotalSpentByStudent(userId: string) {
  console.log(userId);
  try {
    const payments = await db.payment.findMany({
      where: {
        userId: userId,
        status: "completed",
      },
    });
    console.log(payments);

    const totalSpent = payments.reduce((total, payment) => total + payment.amount, 0);
    return totalSpent;
  } catch (error) {
    console.error(error);
  }
}

//get total test purchased by student
export async function getTotalTestsPurchasedByStudent(userId: string) {
  try {
    const payments = await db.payment.findMany({
      where: {
        userId: userId,
        status: "completed",
      },
    });

    return payments.length;
  } catch (error) {
    console.error(error);
  }
}


//recently purchased test by student
export async function getRecentlyPurchasedTestsByStudent(userId: string) {
  try {
    const payments = await db.payment.findMany({
      where: {
        userId: userId,
        status: "completed",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        test: true,
      },
    });

    return payments;
  } catch (error) {
    console.error(error);
  }
}


export async function storeTestResult(result: {
  userId: string;
  testId: number;
  timeTaken: string;
  questionsAttempted: number;
  correctAnswers: number;
  wrongAnswers: number;
  overallResult: number;
}) {
  const { userId, testId, timeTaken, questionsAttempted, correctAnswers, wrongAnswers, overallResult } = result;

  const testResult = await db.testResult.create({
    data: {
      userId,
      testId,
      timeTaken,
      questionsAttempted,
      correctAnswers,
      wrongAnswers,
      overallResult,
    },
  });

  return testResult;
}

