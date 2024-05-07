"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Test } from "@/types/types";
import { useMemo, useState } from "react";
import TestCard from "../TestCard";

export default function FilterTest({
  role,
  username,
  tests,
}: {
  role: string;
  username: string;
  tests: Test[];
}) {
  const [filter, setFilter] = useState("all");

  const filteredTests = useMemo(() => {
    return tests.filter((test) =>
      filter === "all"
        ? test
        : filter === "publish"
        ? test.published
        : !test.published
    );
  }, [tests, filter]);

  return (
    <div className="mb-10">
      <div className="flex justify-end my-4">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="publish">Publish</SelectItem>
            <SelectItem value="unpublish">unpublish</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
        {filteredTests?.map((test) => {
          if (role === "student" && !test.published) return;
          return (
            <TestCard
              key={test.id}
              id={test.id}
              userId={test.userId}
              title={test.title}
              instructor={
                role !== "student" ? username : (test?.user?.name as string)
              }
              description={test.description as string}
              duration={test.duration}
              startAt={test.startAt}
              role={role as string}
              published={test.published}
              isPurchased={test.purchased}
              price={test.price}
            />
          );
        })}
      </div>
    </div>
  );
}
