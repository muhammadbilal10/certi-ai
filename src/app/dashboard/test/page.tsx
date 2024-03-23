import { getPublishedTests, getTestsByUserId } from "@/actions/test";
import { getRole } from "@/actions/user";
import TestCard from "@/components/common/TestCard";
import { Button } from "@/components/ui/button";
import { auth, currentUser } from "@clerk/nextjs";

import { Plus } from "lucide-react";
import Link from "next/link";

async function getTests(id: string, role: string) {
  if (role === "instructor") {
    const data = await getTestsByUserId(id);
    return data;
  } else {
    const data = await getPublishedTests();
    return data;
  }
}
export default async function CreateTestPage() {
  const { userId } = auth();
  const role = await getRole();

  console.log(userId);
  const tests = await getTests(userId as string, role as string);
  console.log(tests);
  return (
    <div>
      <div className="flex justify-between pr-4">
        <h1>My Test</h1>
        {role === "instructor" && (
          <Button asChild>
            <Link href="/dashboard/test/create-test">
              <Plus size={24} />
              Create Test
            </Link>
          </Button>
        )}
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {tests?.map((test) => {
          if (role === "student" && !test.published) return;
          return (
            <TestCard
              key={test.id}
              id={test.id}
              userId={test.userId}
              title={test.title}
              instructor="Instructor Name"
              description={test.description}
              duration={test.duration}
              startAt={test.startAt}
              role={role as string}
              published={test.published}
            />
          );
        })}
      </div>
    </div>

    // <form action={testhandler}>
    //   <input type="text" name="testname" placeholder="Test Name" />
    //   <input type="file" name="file" />
    //   <button type="submit">Upload</button>
    // </form>
  );
}
