import Sidebar from "@/components/layout/Sidebar";
import Topnav from "@/components/layout/Topnav";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ReactNode } from "react";

async function getRole() {
  const { userId } = auth();
  console.log("User Id", userId);

  try {
    const existingUser = await db.user.findUnique({
      where: {
        id: userId as string,
      },
    });
    console.log("Existing User", existingUser);

    if (existingUser) return existingUser?.role;
  } catch (e) {
    console.log("Error", e);
  }
}

export default async function layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const role = await getRole();
  console.log("Role", role);
  return (
    <div className="">
      <Sidebar />
      <Topnav />
      <div className="pt-20 lg:ml-80">{children}</div>
    </div>
  );
}
