"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function getAllTestTakers() {
  try {
    const testTakers = await db.user.findMany({
      where: {
        role: "student",
      },
    });

    if (!testTakers) {
      console.log("No TestTakers found");
      return null;
    }
    console.log(testTakers);
    return testTakers;
  } catch (error) {
    console.log("Error in getTestTakersById:");
    console.error(error);
  }
}

export async function getTestTakersById(id: string) {
  try {
    const testTaker = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!testTaker) {
      console.log("No TestTaker found");
      return null;
    }
    console.log(testTaker);
    return testTaker;
  } catch (error) {
    console.log("Error in getTestTakersById:");
    console.error(error);
  }
}
