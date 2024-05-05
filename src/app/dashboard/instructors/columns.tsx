"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, DeleteIcon, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { deleteInstructor, deleteUser } from "@/actions/user";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Instructor = {
  id: string;
  amount?: number;
  status?: "pending" | "processing" | "success" | "failed";
  email: string;
  name: string;
  joinedAt: Date;
  profileImage?: string;
  role?: string;
  location?: string;
  mobile?: string;
};

export const columns: ColumnDef<Instructor>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.name;
      const pic = row.original.profileImage;

      return (
        <Link href={`/dashboard/instructors/${row.original.id}`}>
          <div className="flex items-center space-x-4">
            <Avatar className="rounded-md h-12 w-12">
              <AvatarImage
                src={
                  row.original.profileImage
                    ? row.original.profileImage
                    : "https://github.com/shadcn.png"
                }
                alt="@shadcn"
              />
              <AvatarFallback>{row.original.name[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-2 flex-1">{name}</div>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "date",
    header: "Joining Date",
    cell: ({ row }) => {
      const date = new Date(row.original.joinedAt);
      return <div>{date.toDateString()}</div>;
    },
  },

  {
    accessorKey: "mobile",
    header: "Mobile",
  },

  {
    accessorKey: "location",
    header: "Location",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      const [opens, setOpens] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      return (
        <>
          {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
            >
            </DropdownMenuItem>
          
          </DropdownMenuContent>
        </DropdownMenu> */}
          <AlertDialog open={opens} onOpenChange={setOpens}>
          {!isLoading ?    <div style={{
              cursor
                : "pointer"
            }} onClick={() => { setOpens(true) }}><DeleteIcon className="text-primary" /> 
              </div>:<ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> }

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={async () => {
                  setIsLoading(true);
                  await deleteInstructor(data.id as string);
                  setIsLoading(false);
                }}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
