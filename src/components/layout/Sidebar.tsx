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
import { Input } from "@/components/ui/input";

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
import React, { use } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Activity,
  ArrowUpRight,
  CircleUser,
  DollarSign,
  Package2,
  Search,
  Users,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const SidebarContent = ({ role, userId }: { role: string; userId: string }) => {
  const pathName = usePathname();
  const profileRoute = role === "student" ? "test-takers" : "instructors";

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
      `/dashboard/${profileRoute}/${userId}`,
    ],
    student: [
      "/dashboard",
      "/dashboard/test",
      "/dashboard/test-environment",
      `/dashboard/${profileRoute}/${userId}`,
    ],
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
    {
      title: "Profile",
      icon: <UserRound size={24} />,
      href: `/dashboard/${profileRoute}/${userId}`,
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
      <div className=" h-20 mx-auto">
        <Image
          src="https://i.postimg.cc/nLFKWJ5z/Rectangle-1.png"
          alt="Logo"
          width={326}
          height={77}
        />
      </div>
      <Separator className="my-10" />
      <div className="flex flex-col space-y-8 ml-4">
        {filteredItems.map((item, index) => (
          <Button
            key={index}
            className=" w-48 justify-start"
            asChild
            variant={pathName === item.href ? "default" : "ghost"}
          >
            <Link href={item.href}>
              {React.cloneElement(item.icon, { className: "mr-2 h-5 w-5" })}
              {item.title}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

const Sidebar = async ({ role, userId }: { role: string; userId: string }) => {
  const pathName = usePathname();
  const profileRoute = role === "student" ? "test-takers" : "instructors";

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
      `/dashboard/${profileRoute}/${userId}`,
    ],
    student: [
      "/dashboard",
      "/dashboard/test",
      "/dashboard/test-environment",
      `/dashboard/${profileRoute}/${userId}`,
    ],
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
      title: "Environment",
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
    {
      title: "Profile",
      icon: <UserRound size={24} />,
      href: `/dashboard/${profileRoute}/${userId}`,
    },
  ];
  const filteredItems = sidebarItems.filter((item) =>
    roleBasedItems[role]?.includes(item.href)
  );

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 mb-10">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image
            src="https://i.postimg.cc/nLFKWJ5z/Rectangle-1.png"
            alt="Logo"
            width={300}
            height={85}
          />
          <Package2 className="h-6 w-6 sr-only" />
          <span className="sr-only">Acme Inc</span>
        </Link>

        {filteredItems.map((item, index) => (
          <Link
            href={item.href}
            className={`${
              pathName === item.href
                ? "text-foreground"
                : "text-muted-foreground"
            } transition-colors hover:text-foreground`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Image
                src="https://i.postimg.cc/nLFKWJ5z/Rectangle-1.png"
                alt="Logo"
                width={150}
                height={77}
              />
              <Package2 className="h-6 w-6 sr-only" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {filteredItems.map((item, index) => (
              <Link
                href={item.href}
                className={`${
                  pathName === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                } hover:text-foreground`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <UserButton afterSignOutUrl="/" />
        {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
      </div>
    </header>
    // <div className="lg:shadow-md fixed w-full max-w-72 z-50">
    //   <ScrollArea className="lg:min-h-screen p-4">
    //     <Sheet>
    //       <SheetTrigger>
    //         <Menu size={24} className="lg:hidden" />
    //       </SheetTrigger>
    //       <SheetContent side={"left"} className="w-[300px]">
    //         <SheetHeader>
    //           <SheetTitle></SheetTitle>
    //           <SheetDescription></SheetDescription>
    //         </SheetHeader>
    //         <SidebarContent role={role} userId={userId} />
    //       </SheetContent>
    //     </Sheet>
    //     <div className="hidden lg:block">
    //       <SidebarContent role={role} userId={userId} />
    //     </div>
    //   </ScrollArea>
    // </div>
  );
};

export default Sidebar;
