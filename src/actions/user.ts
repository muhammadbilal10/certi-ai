"use server";
import { db } from "@/lib/db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs";
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

export async function createUser(
  name: string,
  role: string,
  location: string,
  mobile: string
) {
  console.log(name);
  const user = await currentUser();
  const { userId } = auth();
  const email = user?.emailAddresses[0].emailAddress;
  const newName = name ? name : user?.firstName + " " + user?.lastName;
  // const role = formData.get("role");
  // const location = formData.get("location");
  //const mobile = formData.get("mobile");

  // Validate that name, mobile, role, and location are not empty

  //  if (!newName || newName === "" || newName === "undefined" || !mobile || mobile === "" || mobile === "undefined" || !role || role === "" || role === "undefined" || !location || location === "" || location === "undefined") {
  //   throw new Error("All fields are required");
  // }

  // // Validate mobile number
  // const mobileRegex = /^[0-9\b+]+$/;
  // if (!mobileRegex.test(mobile as string) || (mobile as string).length > 13) {
  //   throw new Error("Invalid mobile number.");
  // }

  // // Validate location
  // const locationRegex = /^[A-Za-z0-9\s,]+$/;
  // if (!locationRegex.test(location as string)) {
  //   throw new Error("Invalid location. Only alphabets, numbers, and spaces are allowed");
  // }

  // // Validate name
  // const nameRegex = /^[A-Za-z\s]+$/;
  // if (!nameRegex.test(newName as string)) {
  //   throw new Error("Invalid name. Only alphabetic characters are allowed");
  // }

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

//GET recent users
export async function getRecentUsers() {
  try {
    const users = await db.user.findMany({
      where: {
        role: {
          not: 'admin',
        },
      },
      orderBy: {
        joinedAt: "desc",
      },
      take: 5,
    });
    return users;
  } catch (e) {
    console.log("Error", e);
  }
}

//delete users by id
// export async function deleteUser(id: string) {
//   try {
//     await clerkClient.users.deleteUser(id);
//     await db.payment.deleteMany({
//       where: {
//         userId: id,
//       },
//     });
    
//     await db.payment.deleteMany({
//       where: {
//         test: {
//           userId: id,
//         },
//       },
//     });

  
//     await db.test.deleteMany({
//       where: {
//         userId: id,
//       },
//     });

   
//     await db.payment.deleteMany({
//       where: {
//         userId: id,
//       },
//     });

//     await db.user.delete({
//       where: {
//         id: id,
//       },
//     });


//   } catch (e) {
//     console.log("Error", e);
//   }
//   redirect("/dashboard/test-takers");
  
// }


//

export async function deleteUser(id: string) {
  try {
    // Delete all payments related to the user
    await db.payment.deleteMany({
      where: {
        userId: id,
      },
    });

    // Get all test results related to the user
    const testResults = await db.testResult.findMany({
      where: {
        userId: id,
      },
    });

    // Delete all question results related to each test result
    for (let testResult of testResults) {
      await db.questionResult.deleteMany({
        where: {
          testResultId: testResult.id,
        },
      });
    }

    // Now delete all test results related to the user
    await db.testResult.deleteMany({
      where: {
        userId: id,
      },
    });

    // Get all tests related to the user
    const tests = await db.test.findMany({
      where: {
        userId: id,
      },
    });

    // Delete all questions related to each test
    for (let test of tests) {
      await db.question.deleteMany({
        where: {
          testId: test.id,
        },
      });
    }

    // Delete all tests related to the user
    await db.test.deleteMany({
      where: {
        userId: id,
      },
    });

    // Finally, delete the user
    await db.user.delete({
      where: {
        id: id,
      },
    });

  } catch (e) {
    console.log("Error", e);
  }
  redirect("/dashboard/test-takers");
}


export async function deleteInstructor(id: string) {
  try {
    // Get all tests related to the instructor
    const tests = await db.test.findMany({
      where: {
        userId: id,
      },
    });

    // Delete all questions and payments related to each test
    for (let test of tests) {
      await db.question.deleteMany({
        where: {
          testId: test.id,
        },
      });

      await db.payment.deleteMany({
        where: {
          testId: test.id,
        },
      });
    }

    // Delete all test results related to the instructor
    const testResults = await db.testResult.findMany({
      where: {
        userId: id,
      },
    });

    // Delete all question results related to each test result
    for (let testResult of testResults) {
      await db.questionResult.deleteMany({
        where: {
          testResultId: testResult.id,
        },
      });
    }

    // Now delete all test results related to the instructor
    await db.testResult.deleteMany({
      where: {
        userId: id,
      },
    });

    // Delete all tests related to the instructor
    await db.test.deleteMany({
      where: {
        userId: id,
      },
    });

    // Delete all payments related to the instructor
    await db.payment.deleteMany({
      where: {
        userId: id,
      },
    });

    // Finally, delete the instructor
    await clerkClient.users.deleteUser(id);
    await db.user.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.log("Error", e);
  }
  redirect("/dashboard/instructors");
}

//find total users whose role is student
export async function getTotalStudents() {
  try {
    const totalStudents = await db.user.count({
      where: {
        role: "student",
      },
    });
    return totalStudents;
  } catch (e) {
    console.log("Error", e);
  }
}