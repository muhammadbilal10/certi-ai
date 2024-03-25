import { getSpecificTest } from "@/actions/test";
import TestPage from "@/components/layout/TestPage";

async function getAttemptedTestsData(id: number) {
  const data = await getSpecificTest(id);
  return data;
}

export default async function AttemptTestPage({ params }: any) {
  const id = params.id;
  const testDetails = await getAttemptedTestsData(Number(id));
  console.log(testDetails);
  const questions = testDetails?.questions;

  return (
    <div>
      <div>
        <TestPage
          questions={testDetails?.questions || []}
          testTime={testDetails?.duration ? testDetails?.duration * 60 : 0}
          duration={testDetails?.duration || 30}
          title={testDetails?.title || ""}
          description={testDetails?.description || ""}
        />
      </div>
    </div>
  );
}
