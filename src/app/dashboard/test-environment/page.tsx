import { getPurchasedTestsByUserId } from "@/actions/payment";
import { getRole } from "@/actions/user";
import TestCard from "@/components/common/TestCard";

import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import NotFound from "./not-found";

interface Test {
  id: number;
  title: string;
  description?: string;
  duration: number;
  price:number;
  userId: string;
  startAt: Date;
  published: boolean;
  purchased?: boolean;
  creatorName: string;
}

async function getPurchasedTestsbyUser(id: string) {
  const data = await getPurchasedTestsByUserId(id);
  console.log(data);
  return data as Test[];
}
export default async function TestEnvironmentPage() {
  const { userId } = auth();
  const role = await getRole();
  const testList = await getPurchasedTestsbyUser(userId as string);
  console.log(testList);

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

    return normalizedCurrentDate.getTime() === normalizedStartDate.getTime();
  }

  

  return (
    <div>
      <h1 className="text-2xl font-semibold">Test List</h1>
      <p className="text-gray-600 text-sm">
        Here you can view all the tests you have purchaseds.
      </p>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-10">
        {testList.map((test) => (
          <TestCard
            key={test.id}
            id={test.id}
            title={test.title}
            userId={test.userId}
            instructor={test.creatorName}
            description={test.description as string}
            duration={test.duration}
            startAt={test.startAt}
            published={test.published}
            price={test.price}
            isPurchased={true}
            role={role as string}
            canStartTest={true}
          />
        ))}
      </div>
    </div>
  );
}
