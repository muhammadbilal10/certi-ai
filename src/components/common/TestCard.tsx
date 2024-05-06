"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormState, useFormStatus } from "react-dom";

import {
  Calendar,
  Clock,
  Delete,
  Edit,
  Loader2,
  Mail,
  Send,
  View,
} from "lucide-react";
import ALertDialogModel from "./ALertDialogModel";
import Link from "next/link";
import { Button } from "../ui/button";
import { publishTest } from "@/actions/test";
import { redirect } from "next/dist/server/api-utils";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  mobile?: string;
  joinedAt: Date;
  profileImage?: string;
  location?: string;
}

function SubmitButton({variant, text}: {variant: string, text:string}) {
  const { pending } = useFormStatus();
  console.log(variant)
  return (
    <Button disabled={pending} variant={variant === 'secondary' ? 'secondary' : 'default'}  type="submit" className="">
      {!pending ? (
        <>
          <Send className="h-5 w-5 mr-2" /> {text}
        </>
      ) : (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      )}
    </Button>
  );
}

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
  canStartTest = false,
  price = 30,
}: {
  id: number;
  title: string;
  description: string | null;
  instructor: string | null;
  duration: number;
  startAt: Date;
  userId: string;
  isEdit?: boolean;
  role?: string;
  published: boolean;
  isPurchased?: boolean;
  canStartTest?: boolean;
  price?: number;
}) {
  const [state, formAction] = useFormState(publishTest, null);

  function StartTest(testStartDate: Date | string) {
    const currentDate = new Date();
    const startDate = new Date(testStartDate);

    const normalizedCurrentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const normalizedStartDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );

    return normalizedCurrentDate >= normalizedStartDate;
  }

  const start = canStartTest ? StartTest(startAt) : false;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="line-clamp-1 leading-1 mr-1">{title}</CardTitle>
          {role === "instructor" && (
            <form action={formAction}>
              <input type="hidden" name="id" value={id} />

              <input
                type="hidden"
                name="publish"
                value={published ? "false" : "true"}
              />
              <SubmitButton
                variant={published ? "secondary" : "default"}
                text={published ? "unpublish" : "Publish"}
              />
            </form>
          )}

          {role === "student" &&
            (canStartTest ? (
              <Button
                asChild
                disabled={start}
                variant={!start ? "secondary" : "default"}
              >
                {start ? (
                  <Link href={`/dashboard/test-environment/${id}`}>
                    Start Test
                  </Link>
                ) : (
                  <span>Unable</span>
                )}
              </Button>
            ) : (
              <Button
                asChild
                disabled={isPurchased}
                variant={isPurchased ? "secondary" : "default"}
              >
                {isPurchased ? (
                  <span>Purchased</span>
                ) : (
                  <Link href={`/checkout/${id}`}>
                    {isPurchased ? "Purchased" : "Purchase"}
                  </Link>
                )}
              </Button>
            ))}
        </div>
        <CardDescription>
          <span className="mb-4 line-clamp-2">{description}</span>
          {instructor}
          <span className="flex max-sm:flex-col sm:space-x-6 mt-2">
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

      <CardFooter className="flex-col space-y-4 items-start">
        <div className="text-start flex-1 text-blue-300 text-md font-semibold ">
          ${price}
        </div>
        {role === "instructor" && (
          <div className="flex space-x-8">
            {/* <View size={24} /> */}
            <Link href={`/dashboard/test/create-test?type=edit&id=${id}`}>
              <Edit size={24} />
            </Link>
            {/* <Button onClick={handleDelete}>handle</Button> */}
            <ALertDialogModel icon={<Delete size={24} />} text="test" id={id} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
