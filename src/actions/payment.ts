"use server";

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPayment(testId: number, amount: number) {
  const user = await currentUser();
  console.log(user?.id);

  try {
    const payment = await db.payment.create({
      data: {
        testId,
        amount,
        status: "completed",
        userId: user?.id as string,
      },
    });
  } catch (e) {
    console.log("Error creating payment", e);
    console.error(e);
  }
}

export async function getPurchasedTestsStatus(testId: number, userId: string) {
  try {
    const payment = await db.payment.findFirst({
      where: {
        userId: userId,
        testId,
        status: "completed",
      },
    });

    if (payment) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error getting purchased tests status", error);
    console.error(error);
  }
}

export async function getAllPayments() {
  const payments = await db.payment.findMany({
    include: {
      user: true,
    },
  });
  return payments.map((payment) => ({
    ...payment,
    userName: payment.user?.name,
    userEmail: payment.user?.email,
    userMobile: payment.user?.mobile,
    userLocation: payment.user?.location,
  }));
}

export async function getPurchasedTestsByUserId(userId: string) {
  try {
    const purchasedTests = await db.payment
      .findMany({
        where: {
          userId: userId,
          status: "completed",
        },
        include: {
          test: {
            include: {
              user: true,
            },
          },
        },
      })
      .then((payments) =>
        payments.map((payment) => {
          return {
            ...payment.test,
            creatorName: payment.test.user.name,
          };
        })
      );

    return purchasedTests;
  } catch (error) {
    console.log("Error getting purchased tests by user", error);
    console.error(error);
    return []; // Return an empty array or handle the error as appropriate
  }
}
