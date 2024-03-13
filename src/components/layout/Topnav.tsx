import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import Sidebar from "./Sidebar";
import { UserButton } from "@clerk/nextjs";

export default function Topnav() {
  return (
    <nav className="shadow-sm bg-white flex p-3 mb-4 fixed w-full">
      <div className="flex-1 flex items-center justify-end space-x-6 pr-5">
        <Bell size={24} />
        {/* <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
