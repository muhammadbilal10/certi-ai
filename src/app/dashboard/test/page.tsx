import { getPublishedTests, getTestsByUserId } from "@/actions/test";
import { getRole, getUserById } from "@/actions/user";
import TestCard from "@/components/common/TestCard";
import FilterTest from "@/components/common/test/FilterTest";
import { Button } from "@/components/ui/button";
import { Test } from "@/types/types";
import { auth } from "@clerk/nextjs";

import { Plus } from "lucide-react";
import Link from "next/link";

async function getTests(id: string, role: string) {
  if (role === "instructor") {
    const data = await getTestsByUserId(id);
    return data as Test[];
  } else {
    const data = await getPublishedTests(id);
    return data as Test[];
  }
}

export default async function CreateTestPage() {
  const { userId } = auth();
  const role = await getRole();
  const user = await getUserById(userId as string);

  const tests = await getTests(userId as string, role as string);
  console.log(tests);

  return (
    <div>
      <div className="flex flex-col justify-between pr-4">
        <div className="flex max-sm:flex-col justify-between">
          <h1 className="text-2xl font-semibold mb-2 sm:mb-10">Test List</h1>
          <div className="space-x-2">
            <Button asChild>
              <Link href="/dashboard/chat">
                <Plus size={24} />
                Create AI Test
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/dashboard/test/create-test">
                <Plus size={24} />
                Create Test
              </Link>
            </Button>
          </div>
        </div>
        {role === "instructor" && (
          <div className="">
            <div>
              <FilterTest
                role={role}
                tests={tests}
                username={user?.name as string}
              />
            </div>
          </div>
        )}
      </div>
      {/* <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
        {tests?.map((test) => {
          if (role === "student" && !test.published) return;
          return (
            <TestCard
              key={test.id}
              id={test.id}
              userId={test.userId}
              title={test.title}
              instructor={
                role !== "student"
                  ? (user?.name as string)
                  : (test?.user?.name as string)
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
      </div> */}
    </div>

    // <form action={testhandler}>
    //   <input type="text" name="testname" placeholder="Test Name" />
    //   <input type="file" name="file" />
    //   <button type="submit">Upload</button>
    // </form>
  );
}
