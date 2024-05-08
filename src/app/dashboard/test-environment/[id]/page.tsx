import { getSpecificTest } from "@/actions/test";
import TestPage from "@/components/layout/TestPage";

type Question = {
  id: number;
  question: string;
  options: string[] ;
  type: string;
  answer?: number;
  testId: number;
};

async function getAttemptedTestsData(id: number) {
  const data = await getSpecificTest(id);
  return data;
}

export default async function AttemptTestPage({ params }: any) {
  const id = params.id;
  const testDetails = await getAttemptedTestsData(Number(id));
  
  const questions = testDetails?.questions as Question[];

  return (
    <div>
      <div>
        <TestPage
          questions={questions || []}
          testTime={testDetails?.duration ? testDetails?.duration * 60 : 0}
          duration={testDetails?.duration || 30}
          title={testDetails?.title || ""}
          description={testDetails?.description || ""}
          testId={testDetails?.id as number}
        />
      </div>
    </div>
  );
}
