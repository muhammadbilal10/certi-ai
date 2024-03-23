"use server";
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

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

export async function createUser(formData: FormData) {
  const user = await currentUser();
  const { userId } = auth();
  const email = user?.emailAddresses[0].emailAddress;

  const role = formData.get("role") as string;
  console.log("Role", role);
  const location = formData.get("location") as string;
  const mobile = formData.get("mobile") as string;

  try {
    const res = await db.user.create({
      data: {
        id: userId as string,
        name: user?.firstName + " " + user?.lastName,
        email: email as string,
        role: role,
        profileImage: user?.imageUrl,
        location: location,
        mobile: mobile,
      },
    });
  } catch (e) {
    console.log("Error", e);
  }
  redirect("/dashboard");
}