import Sidebar from "@/components/layout/Sidebar";
import Topnav from "@/components/layout/Topnav";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ReactNode } from "react";

export default function layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="">
      <Sidebar />
      <Topnav />
      <div className="pt-20 lg:ml-80">{children}</div>
    </div>
  );
}
