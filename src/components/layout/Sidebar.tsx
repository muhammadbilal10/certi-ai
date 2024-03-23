import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  BookOpen,
  CreditCard,
  File,
  GraduationCap,
  Home,
  Menu,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { get } from "http";

const SidebarContent = () => {
  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <Home size={24} />,
      href: "/dashboard",
    },
    {
      title: "Test (studentSide)",
      icon: <File size={24} />,
      href: "/dashboard/test",
    },
    {
      title: "TestEnvironment (adminSide)",
      icon: <BookOpen size={24} />,
      href: "/dashboard/test-environment",
    },
    {
      title: "Instructors (adminSide)",
      icon: <UserRound size={24} />,
      href: "/dashboard/instructors",
    },

    {
      title: "TestTakers (adminSide)",
      icon: <GraduationCap size={24} />,
      href: "/dashboard/test-takers",
    },

    {
      title: "Payments",
      icon: <CreditCard size={24} />,
      href: "/dashboard/payments",
    },
  ];
  // const sidebarItems = [
  //   {
  //     title: "Dashboard",
  //     icon: <Home size={24} />,
  //     href: "/dashboard",
  //   },
  //   {
  //     title: "TestTakers",
  //     icon: <GraduationCap size={24} />,
  //     href: "/dashboard/test-takers",
  //   },
  //   {
  //     title: "Instructors",
  //     icon: <UserRound size={24} />,
  //     href: "/dashboard/instructors",
  //   },
  //   {
  //     title: "TestEnvironment",
  //     icon: <BookOpen size={24} />,
  //     href: "/dashboard/test-environment",
  //   },
  //   {
  //     title: "Payments",
  //     icon: <CreditCard size={24} />,
  //     href: "/dashboard/payments",
  //   },
  // ];
  return (
    <div>
      <div className="max-w-28 h-20 mx-auto">
        <Image
          src="https://s3-alpha-sig.figma.com/img/106a/d7e2/91cc33fdeb6e0feb9ca20a2303150c5f?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BxVeKLUuSU3Nb1KE47U-~nceGa-rO~k9J1-BkenCLWijBXcVY83gfSM~CXGOWPbReT87G2BBtPWxRTtj65QVnl7oA3jGvKPYDajveGDqExpspWstKG~1P7rAXs~OUBjdjkilCDxx1ZfuxOF~SnEu3~8naQjgVP3FsiHQPRf2H0UHo-6fAOaSOASmYHQVYI1ErAwzT3qDvc8mVKIFEKUv9yVeBtGnvW8szitP2wGRWv6-DQWXGZh-iLpUe33RIFfzfx8jMWZiCKsBDyVxieBXcHqKyCjrZv9CLfX9OvnR5UKr52CY9p9kFppAAIrnl148hPsD1NPL5hMufaytddClww__"
          alt="Logo"
          width={326}
          height={77}
        />
      </div>
      <Separator className="my-10" />
      <div className="flex flex-col space-y-8 ml-4">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center space-x-4 "
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Sidebar = async () => {
  return (
    <div className="lg:shadow-md fixed w-full max-w-72 z-50">
      <ScrollArea className="lg:min-h-screen p-4">
        <Sheet>
          <SheetTrigger>
            <Menu size={24} className="lg:hidden" />
          </SheetTrigger>
          <SheetContent side={"left"} className="w-[300px]">
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <SidebarContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <SidebarContent />
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
