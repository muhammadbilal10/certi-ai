import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Topnav() {
  return (
    <nav className="shadow-sm flex p-3 mb-4">
      <div className="lg:hidden">
        <Sidebar />
      </div>
      <div className="flex-1 flex items-center justify-end space-x-6 pr-10">
        <Bell size={24} />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
