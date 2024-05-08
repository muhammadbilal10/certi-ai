"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { permanentRedirect, redirect } from "next/navigation";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Question = {
  id: number;
  question: string;
  options: string[];
  type: string;
  answer?: number;
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

type AttemptedQuestion = {
  id: number;
  question: string;
  options?: string[];
  type: string;
  attemptedUserAnswer: string;
};

// export async function shuffleQuestion(questions: Question[]) {
//   try {
//     if (!process.env.OPENAI_API_KEY) {
//       return [];
//     }

//     if (!questions) {
//       return [];
//     }

//     console.log("start shuffling ", questions);

//     const systemMessage =
//       "Convert test into a JSON structured format and provide data will be remained same.";
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo-1106",
//       messages: [
//         {
//           role: "user",
//           content: `reorder of the following questions array while keeping them unchanged: \n\n${questions}\n\n`,
//         },
//       ],
//       tools: [
//         {
//           type: "function",
//           function: {
//             name: "get_test_details",
//             description: "Get the test detail from the user prompt",
//             parameters: {
//               type: "object",
//               properties: {
//                 questions: {
//                   type: "array",
//                   description: "The list of questions for the test",
//                   items: {
//                     type: "object",
//                     properties: {
//                       question: {
//                         type: "string",
//                         description: "The question text",
//                       },
//                       options: {
//                         type: "array",
//                         description: "The options for the question",
//                         items: {
//                           type: "string",
//                         },
//                       },
//                       type: {
//                         type: "string",
//                         enum: ["MCQS", "Descriptive", "True/False"],
//                         description: "The type of the question",
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       ],
//       tool_choice: "auto",
//     });

//     const result = response?.choices[0]?.message.tool_calls?.[0]?.function.arguments;
//     const finalresult = JSON.parse(result || "{}");
//     console.log(`Shuffle Questions ${JSON.stringify(finalresult)}`);
//     return (finalresult?.questions as Question[]) || "[]";
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function getRecentTestResult(testId: number) {
  const { userId } = auth();
  const result = await db.testResult.findFirst({
    where: {
      testId: Number(testId),
      userId: userId as string,
    },
    include: {
      questions: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
}
export async function submitTestResult(
  finalresult: any,
  testId: number,
  totalScore: number,
  gotScore: number
) {
  try {
    const { userId } = auth();
    const res = await db.testResult.create({
      data: {
        userId: userId as string,
        testId: testId as number,
        gotScore: gotScore.toString(),
        totalScore: totalScore.toString(),
        questions: {
          create: finalresult?.map((ques: any) => ({
            question: ques.question as string,
            userAnswer: ques.answer as string,
            options: ques.options as string[],
            correctAnswer: ques.correct as string,
            score: ques.score.toString(),
            description: ques.correctAnswerDescription as string,
          })),
        },
      },
    });

    console.log("result Submitted");
    return res;
  } catch (error) {
    console.log(error);
  }
  permanentRedirect(`/dashboard/test-result/${testId}`);
}

export async function submitAiTest(attemptedQuestions: string, testId: number) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return "missing api key";
    }

    console.log(`Evaluate Questions ${attemptedQuestions}`);

    const prompt = `Please evaluate the user's attempted test questions and provide the correct answer if the user's answer is incorrect.\n\n:${attemptedQuestions}`;
    if (attemptedQuestions) {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "evaluate_questions",
              description:
                "Evaluate a list of test questions and provide result feeback.",
              parameters: {
                type: "object",
                properties: {
                  questions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        type: {
                          type: "string",
                          description:
                            "The type of question (e.g., MCQS, True/False, Descriptive etc.)",
                        },
                        question: {
                          type: "string",
                          description: "The test question",
                        },
                        answer: {
                          type: "string",
                          description: "The user's answer to the question",
                        },
                        options: {
                          type: "array",
                          description: "The options for the question",
                          items: {
                            type: "string",
                          },
                        },
                        correct: {
                          type: "string",
                          description:
                            "The correct description for the question if not correct",
                        },
                        score: {
                          type: "number",
                          description: "The total score for the question",
                        },
                        correctAnswerDescription: {
                          type: "string",
                          description:
                            "The correct answer description for the question",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        ],
        tool_choice: "auto",
      });
      const result =
        response?.choices[0]?.message.tool_calls?.[0]?.function.arguments;
      const finalresult = JSON.parse(result || "{}");
      console.log("FinalResult", result);
      return finalresult?.questions || [];
    }
  } catch (error) {
    console.log(error);
  }
  // redirect("/dashboard/test");
}

export async function createAiTest(prevState: any, formData: FormData) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return "missing api key";
    }

    const test = formData.get("test");
    console.log(`test ${test}`);

    const prompt = `${test}`;
    if (test) {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "get_test_details",
              description: "Get the test detail from the user prompt",
              parameters: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "The test name",
                  },
                  description: {
                    type: "string",
                    description: "The test description",
                  },
                  duration: {
                    type: "number",
                    description:
                      "The test time duration and convert test time into minutes",
                  },
                  price: {
                    type: "number",
                    description:
                      "The price of the test. if test price in other currency format then convert it into dollar",
                  },
                  questions: {
                    type: "array",
                    description: "The list of questions for the test",
                    items: {
                      type: "object",
                      properties: {
                        question: {
                          type: "string",
                          description: "The question text",
                        },
                        options: {
                          type: "array",
                          description: "The options for the question",
                          items: {
                            type: "string",
                          },
                        },
                        type: {
                          type: "string",
                          enum: ["MCQS", "Descriptive", "True/False"],
                          description: "The type of the question",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        ],
        tool_choice: "auto",
      });

      const result =
        response?.choices[0]?.message.tool_calls?.[0]?.function.arguments;
      const finalresult = JSON.parse(result || "{}");
      console.log("FinalResult", result);
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
    }
  } catch (error) {
    console.log(error);
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

    console.log("testDetials UPdated", testDetails);

    // First, delete all questions associated with the test
    await db.question.deleteMany({
      where: { testId: testId },
    });

    // Then, update the test and create new questions
    const result = await db.test.update({
      where: { id: testId },
      data: {
        title: testDetails?.title,
        description: testDetails?.description,
        duration: testDetails?.duration,
        startAt: testDetails?.startAt,
        userId: userId as string,
        price: testDetails?.price,
        questions: {
          create: testDetails?.questions.map((question) => ({
            question: question.question,
            options: question.options,
            answer: question.answer,
          })),
        },
      },
    });
  } catch (error) {
    console.error("Update Test Error:", error);
    // Handle error
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
      test: {
        orderBy: {
          id: "desc",
        },
      },
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

// export async function storeTestResult(result: {
//   userId: string;
//   testId: number;
//   timeTaken: string;
//   questionsAttempted: number;
//   correctAnswers: number;
//   wrongAnswers: number;
//   overallResult: number;
// }) {
//   const {
//     userId,
//     testId,
//     timeTaken,
//     questionsAttempted,
//     correctAnswers,
//     wrongAnswers,
//     overallResult,
//   } = result;

//   const testResult = await db.testResult.create({
//     data: {
//       userId,
//       testId,
//       timeTaken,
//       questionsAttempted,
//       correctAnswers,
//       wrongAnswers,
//       overallResult,
//     },
//   });

//   return testResult;
// }

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

export async function getPurchasedTests(instructorId: string) {
  const payments = await db.payment.findMany({
    where: {
      status: "completed",
      test: {
        userId: instructorId,
      },
    },
    include: {
      user: true,
      test: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  console.log(`f: ${JSON.stringify(payments)}`);

  return payments;
}

export async function getRecentAddedTestsbyInstructor(userId: string) {
  const tests = await db.test.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      id: "desc",
    },
    take: 5,
  });

  return tests;
}
