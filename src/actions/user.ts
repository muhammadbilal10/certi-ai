"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function getRole() {
  const { userId } = auth();
  try {
    const existingUser = await db.user.findUnique({
      where: {
        id: userId as string,
      },
    });

    if (existingUser) return existingUser?.role;
  } catch (e) {
    console.log("Error", e);
  }
}
