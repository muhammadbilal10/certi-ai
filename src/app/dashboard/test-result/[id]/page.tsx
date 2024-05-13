import { getRecentTestResult } from "@/actions/test";
import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

interface TestResultPageProps {
  params: { id: number };
}

export default async function TestResultPage({ params }: TestResultPageProps) {
  const id = params.id as number;

  const testsResult = await getRecentTestResult(id);

  const totalQuestions = testsResult?.questions?.length || 0;
  const totalCorrectAnswers = testsResult?.questions?.filter(
    (question) => question.correctAnswer === question.userAnswer
  ).length || 0;
  const totalWrongAnswers = totalQuestions - totalCorrectAnswers;

  const getAnswerStatus = (question: any) =>
    question.correctAnswer === question.userAnswer ? "text-green-500" : "text-red-500";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-md p-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Test Result</h2>
        <div className="flex flex-col space-y-2">

          <div className="text-3xl font-bold">{`${totalCorrectAnswers}/${totalQuestions}`}</div>

          {totalCorrectAnswers / totalQuestions >= 0.7 && (
            <span className="text-green-500 font-semibold">Passed!</span>
          )}
          {totalCorrectAnswers / totalQuestions < 0.7 && (
            <span className="text-red-500 font-semibold">Failed</span>
          )}
        </div>

      </div>

      <div className="mt-8">
        {testsResult?.questions?.map((question, index) => (
          <div key={index} className="mb-6 border rounded-md p-4">
            <h3 className="text-lg font-medium mb-2">{question.question}</h3>
            <div className="flex flex-col space-y-1">
              {question?.type === "MCQS" && (
                question?.options?.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Dot />
                    <span className={option === question.userAnswer ? getAnswerStatus(question) : "text-gray-700"}>{option}</span>
                  </div>
                ))
              )}
              {question?.type === "True/False" && (
                <>
                  <div className="flex items-center space-x-2">
                    <Dot />
                    <span className={question.userAnswer === "True" ? getAnswerStatus(question) : "text-gray-700"}>True</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Dot />
                    <span className={question.userAnswer === "False" ? getAnswerStatus(question) : "text-gray-700"}>False</span>
                  </div>
                </>
              )}
              {question.correctAnswer !== question.userAnswer && (
                <div>
                  { <div className="text-green-500 text-sm font-italic">
                      Correct Answer: {question.correctAnswer}
                    </div>
                  }

                  <div className="text-sm font-italic">
                    Description: {question.description}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-center space-x-2">
          <Button asChild>
            <Link href={`/dashboard/test-environment/${id}`}>Retake</Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/test-environment`}>Back</Link>
          </Button>
        </div>
  

      </div>
    </div>
  );
}
