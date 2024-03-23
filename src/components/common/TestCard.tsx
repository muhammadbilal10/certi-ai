"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Calendar, Clock, Delete, Edit, View } from "lucide-react";
import ALertDialogModel from "./ALertDialogModel";
import Link from "next/link";
import { Button } from "../ui/button";
import { publishTest } from "@/actions/test";
import { redirect } from "next/dist/server/api-utils";

export default function TestCard({
  title,
  instructor,
  description,
  duration,
  startAt,
  id,
  userId,
  isEdit = false,
  role,
  published,
  isPurchased = false,
}: {
  id: number;
  title: string;
  description: string | null;
  instructor: string;
  duration: number;
  startAt: Date;
  userId: string;
  isEdit?: boolean;
  role?: string;
  published: boolean;
  isPurchased?: boolean;
}) {
  const updateTest = publishTest.bind(null, id);
  console.log("published", published);
  console.log(instructor);
  console.log("role", role);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{title}</CardTitle>
          {role === "instructor" && (
            <form action={updateTest}>
              <Button
                type="submit"
                disabled={published}
                variant={published ? "secondary" : "default"}
              >
                {published ? "Published" : "Publish"}
              </Button>
            </form>
          )}
          {role === "student" && (
            <form action={updateTest}>
              <Button
                asChild
                type="submit"
                disabled={isPurchased}
                variant={isPurchased ? "secondary" : "default"}
              >
                <Link href={`/checkout/${id}`}>
                  {isPurchased ? "Purchased" : "Purchase"}
                </Link>
              </Button>
            </form>
          )}
        </div>
        <CardDescription>
          {instructor}
          <span className="flex space-x-6 mt-2">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {startAt.toDateString()}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {duration}
            </span>
          </span>
        </CardDescription>
      </CardHeader>

      {role === "instructor" && (
        <CardFooter>
          <div className="flex space-x-8">
            <View size={24} />
            <Link href={`/dashboard/test/create-test?type=edit&id=${id}`}>
              <Edit size={24} />
            </Link>
            {/* <Button onClick={handleDelete}>handle</Button> */}
            <ALertDialogModel icon={<Delete size={24} />} text="test" id={id} />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
