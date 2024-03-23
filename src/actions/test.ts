"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
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
