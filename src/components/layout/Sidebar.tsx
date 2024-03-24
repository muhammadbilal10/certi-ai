"use client";
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
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import React from "react";

const SidebarContent = ({ role }: { role: string }) => {
  const pathName = usePathname();

  const roleBasedItems = {
    admin: [
      "/dashboard",
      "/dashboard/instructors",
      "/dashboard/test-takers",
      "/dashboard/payments",
    ],
    instructor: [
      "/dashboard",
      "/dashboard/test",
      "/dashboard/test-environment",
    ],
    student: ["/dashboard", "/dashboard/test", "/dashboard/test-environment"],
  } as Record<string, string[]>;
  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <Home size={24} />,
      href: "/dashboard",
    },
    {
      title: "Test",
      icon: <File size={24} />,
      href: "/dashboard/test",
    },
    {
      title: "Test Environment",
      icon: <BookOpen size={28} />,
      href: "/dashboard/test-environment",
    },
    {
      title: "Instructors",
      icon: <UserRound size={24} />,
      href: "/dashboard/instructors",
    },

    {
      title: "Test Takers",
      icon: <GraduationCap size={24} />,
      href: "/dashboard/test-takers",
    },

    {
      title: "Payments",
      icon: <CreditCard size={24} />,
      href: "/dashboard/payments",
    },
  ];
  const filteredItems = sidebarItems.filter((item) =>
    roleBasedItems[role]?.includes(item.href)
  );

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
        {filteredItems.map((item, index) => (
          <Button
            className=" w-48 justify-start"
            asChild
            variant={pathName === item.href ? "default" : "ghost"}
          >
            <Link key={index} href={item.href}>
              {React.cloneElement(item.icon, { className: "mr-2 h-4 w-4" })}
              {item.title}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

const Sidebar = async ({ role }: { role: string }) => {
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
            <SidebarContent role={role} />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <SidebarContent role={role} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
