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
      <div className="max-lg:hidden">
        <Sidebar />
      </div>
      <div className="lg:ml-80 flex flex-col">
        <Topnav />
        {children}
      </div>
    </div>
  );
}
