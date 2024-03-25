"use client";
import { getSpecificTest } from "@/actions/test";
import TestForm from "@/components/common/test/TestForm";
import TestQuestionForm from "@/components/common/test/TestQuestionForm";

import { Test } from "@/types/types";
import { useEffect, useState } from "react";
import { nullable, number } from "zod";

const steps = [TestForm, TestQuestionForm];

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

export default function CreateTest({
  testData,
  type,
}: {
  testData: TestDetails;
  type: string;
}) {
  const [testDetails, setTestDetails] = useState<TestDetails>(testData || {});

  const [currentStep, setCurrentStep] = useState(0);
  const Component = steps[currentStep];

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  console.log(testDetails);

  return (
    <div>
      <div className="flex justify-between pr-4">
        <Component
          nextStep={nextStep}
          prevStep={prevStep}
          testDetails={testDetails}
          setTestDetails={setTestDetails}
          type={type}
        />
      </div>
    </div>
  );
}
