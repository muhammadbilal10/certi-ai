import { getSpecificTest } from "@/actions/test";
import CreateTest from "@/components/layout/CreateTest";

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: number;
  testId: number;
};

type TestDetails = {
  id: number;
  title: string;
  description: string;
  duration: number;
  price: number;
  startAt: Date;
  userId: string;
  questions: Question[];
};

export default async function CreateTestPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const type = searchParams.type;
  const testDetails = (await getSpecificTest(
    Number(searchParams.id)
  )) as TestDetails;

  return (
    <div>
      <CreateTest testData={testDetails} type={type} />
    </div>
  );
}
