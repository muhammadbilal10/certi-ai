import { getRole } from "@/actions/user";
import Sidebar from "@/components/layout/Sidebar";
import Topnav from "@/components/layout/Topnav";

import { ReactNode } from "react";

export default async function layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const role = (await getRole()) as string;
  console.log(role);

  return (
    <div className="">
      <Sidebar role={role} />
      <Topnav />
      <div className="pt-20 lg:ml-80 lg:pl-5 pl-10 pr-10">{children}</div>
    </div>
  );
}
