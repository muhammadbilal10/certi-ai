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

export default function TestCard({
  title,
  instructor,
  description,
  duration,
  startAt,
  id,
}: {
  id: number;
  title: string;
  description: string | null;
  instructor: string;
  duration: number;
  startAt: Date;
}) {
  async function handleDelete(id: number) {
    console.log(id);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
    </Card>
  );
}
