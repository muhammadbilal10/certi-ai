import { getRecentTestResult } from "@/actions/test";
import { Dot } from "lucide-react";
import React from "react";

export default async function TestResultPage({ params }: any) {
  const id = params.id as number;
  const testsResult = await getRecentTestResult(id);
  console.log(`\n\n ${JSON.stringify(testsResult)}`);
  return (
    <div>
      <div className="p-4 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Test Result</h2>
        {testsResult?.questions.map((question, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-medium mb-2">{question.question}</h3>
            <div className="flex flex-col flex-wrap gap-2">
              {question?.options?.map((option: string, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Dot className={`${question.correctAnswer === question.userAnswer ? "text-green" : ""}`}/> {option}
                </div>
              ))}
            </div>
            <div className="flex mt-2">
              <span className="text-green-600 font-semibold mr-2">
                Correct Answer:
              </span>
              <span className="text-black">{question.correctAnswer}</span>
            </div>
            <div className="flex mt-2">
              <span className="text-green-600 font-semibold mr-2">
                your Answer:
              </span>
              <span className="text-black">{question.userAnswer}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
