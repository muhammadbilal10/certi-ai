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
  const newName = formData.get("name") ? formData.get('name') : user?.firstName + " " + user?.lastName;
  const role = formData.get("role");
  const location = formData.get("location");
  const mobile = formData.get("mobile");

  // Validate that name, mobile, role, and location are not empty

   if (!newName || newName === "" || newName === "undefined" || !mobile || mobile === "" || mobile === "undefined" || !role || role === "" || role === "undefined" || !location || location === "" || location === "undefined") {
    throw new Error("All fields are required");
  }


  // Validate mobile number
  const mobileRegex = /^[0-9\b+]+$/;
  if (!mobileRegex.test(mobile as string) || (mobile as string).length > 13) {
    throw new Error("Invalid mobile number.");
  }

  // Validate location
  const locationRegex = /^[A-Za-z0-9\s,]+$/;
  if (!locationRegex.test(location as string)) {
    throw new Error("Invalid location. Only alphabets, numbers, and spaces are allowed");
  }

  // Validate name
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(newName as string)) {
    throw new Error("Invalid name. Only alphabetic characters are allowed");
  }

  try {
    const res = await db.user.create({
      data: {
        id: userId as string,
        name: newName as string,
        email: email as string,
        role: role as string,
        profileImage: user?.imageUrl,
        location: location as string,
        mobile: mobile as string,
      },
    });
  } catch (e) {
    console.log("Error", e);
  }
  redirect("/dashboard");
}

//get user by id
export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (e) {
    console.log("Error", e);
  }
}
