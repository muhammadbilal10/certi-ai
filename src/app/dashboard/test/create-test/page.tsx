"use client";
import { getSpecificTest } from "@/actions/test";
import TestForm from "@/components/common/test/TestForm";
import TestQuestionForm from "@/components/common/test/TestQuestionForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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

export default function CreateTestPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const type = searchParams.type;
  const [testDetails, setTestDetails] = useState<TestDetails>();

  const [currentStep, setCurrentStep] = useState(0);
  const Component = steps[currentStep];

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  useEffect(() => {
    async function getTest() {
      if (searchParams.type === "edit" && searchParams.id) {
        const test = await getSpecificTest(Number(searchParams.id));
        console.log(test);
        if (test) setTestDetails(test as TestDetails);
      }
    }
    getTest();
  }, [searchParams]);

  if (type === "edit" && !testDetails)
    return (
      <Card className="w-full animate-pulse">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48 rounded-md" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-36 rounded-md" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8 w-full">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-24 rounded-md" />
        </CardFooter>
      </Card>
    );

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
