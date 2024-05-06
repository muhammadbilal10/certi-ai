"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Question = {
  id: number;
  question: string;
  options: string[];
  type: string;
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

export async function createAiTest(prevState: any, formData: FormData) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return "missing api key";
    }

    const test = formData.get("test");
    console.log(`test ${test}`);

    const systemMessage =
      "You are an educational assistant skilled formatting various types of educational tests. Convert test descriptions into a JSON structured format . Each multiple-choice question should include 'type': 'MCQS', 'question': the question text, and 'options': a list of choices. Each descriptive question should include 'type': 'descriptive', 'question': the question text.";

    const prompt = `Please provide details for the following test in a structured format, including title, description, duration (if not specified then set default value 30 in minutes as a numeric value), price (as a numeric value), and questions (an array of questions with their respective options and type). If any field is missing, please add a default value:\n\n${test}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const result = response.choices[0].message.content;
    const finalresult = JSON.parse(result || "{}");
    const { userId } = auth();

    const res = await db.test.create({
      data: {
        title: finalresult.title as string,
         startAt: new Date(),
          userId: userId as string,
        description: finalresult.description as string,
        duration: finalresult.duration as number,
        price: finalresult.price as number,
        questions: {
          create: finalresult.questions.map((ques: Question) => ({
            question: ques.question as string,
            type: ques.type,
            options: ques.options as string[],
          })),
        },
      },
    });
    console.log(`result ${JSON.stringify(finalresult)}`);
  } catch (error) {
    console.log(error);
    return "Failed to add into";
  }
  redirect("/dashboard/test");
}
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
          price: testDetails?.price,
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

export async function publishTest(prevState: any, formData: FormData) {
  const ispublish = formData.get("publish") as string;
  const testId = Number(formData.get("id"));
  console.log(testId);
  console.log(ispublish);
  console.log("publihed");
  try {
    const updatedTest = await db.test.update({
      where: { id: testId },
      data: { published: ispublish === "true" },
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

    const totalEarnings = payments.reduce(
      (total, payment) => total + payment.amount,
      0
    );
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

    const totalSpent = payments.reduce(
      (total, payment) => total + payment.amount,
      0
    );
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
  const {
    userId,
    testId,
    timeTaken,
    questionsAttempted,
    correctAnswers,
    wrongAnswers,
    overallResult,
  } = result;

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

export async function getAllPublishedTests() {
  try {
    const tests = await db.test.findMany({
      where: {
        published: true,
      },
      include: {
        questions: true, // Include questions if needed
        user: true, // Include user details if needed
      },
    });
    return tests;
  } catch (error) {
    console.error("Error fetching published tests:", error);
  }
}

//recent purcahed test
export async function getRecentPurchasedTests() {
  try {
    const payments = await db.payment.findMany({
      where: {
        status: "completed",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        test: true,
        user: true,
      },
    });

    return payments;
  } catch (error) {
    console.error(error);
  }
}

export async function countPublishedTests(userId: string) {
  const totalPublishedTests = await db.test.count({
    where: {
      userId: userId,
      published: true,
    },
  });

  console.log(`\n\n instructor count : ${totalPublishedTests}`);
  return totalPublishedTests;
}