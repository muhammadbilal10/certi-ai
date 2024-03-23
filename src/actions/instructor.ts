"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function getAllInstructors() {
  try {
    const instructors = await db.user.findMany({
      where: {
        role: "instructor",
      },
    });

    if (!instructors) {
      console.log("No instructors found");
      return [];
    }
    return instructors;
  } catch (error) {
    console.log("Error in getAllInstructors:");
    console.error(error);
  }
}

export async function getInstructorById(id: string) {
  try {
    const instructor = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!instructor) {
      console.log("No instructor found");
      return null;
    }
    console.log(instructor);
    return instructor;
  } catch (error) {
    console.log("Error in getInstructorById:");
    console.error(error);
  }
}
