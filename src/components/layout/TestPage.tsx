"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { useFormState, useFormStatus } from "react-dom";
import { Loader2, Send } from "lucide-react";
import { submitAiTest, submitTestResult } from "@/actions/test";

type Question = {
  id: number;
  question: string;
  options?: string[];
  type: string;
  answer?: string;
  testId: number;
};

type AttemptedQuestion = {
  id: number;
  question: string;
  options?: string[];
  type: string;
  attemptedUserAnswer: string;
};

interface TestPageProps {
  questions: Question[];
  testTime: number;
  duration: number;
  title: string;
  description: string;
  testId: number;
}

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full">
      {!pending ? (
        <>
          <Send className="h-5 w-5 mr-2" /> Submit
        </>
      ) : (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      )}
    </Button>
  );
}

const TestPage: React.FC<TestPageProps> = ({
  questions,
  testTime,
  duration,
  description,
  title,
  testId,
}) => {
  const [time, setTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState<
    AttemptedQuestion[]
  >([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  // const [state, formAction] = useFormState(submitAiTest, null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime: any) => {
        if (prevTime >= testTime) {
          handleSubmit();
          clearInterval(timer);
          return prevTime;
        } else {
          return prevTime + 1;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [testTime]);

  useEffect(() => {
    const totalQuestions = questions.length;
    const answeredQuestions = attemptedQuestions.length;
    const calculatedProgress = (answeredQuestions / totalQuestions) * 100;
    setProgress(calculatedProgress);
  }, [attemptedQuestions, questions]);

  useEffect(() => {
    const mcqs = questions.filter((q) => q.type === 'MCQS' || q.type === 'True/False');
    // const trueFalse = questions.filter((q) => q.type === 'True/False');
    const descriptive = questions.filter((q) => q.type === 'Descriptive');
  
    const shuffledMcqs = [...mcqs].sort(() => Math.random() - 0.5);
    // const shuffledTrueFalse = [...trueFalse].sort(() => Math.random() - 0.5);
    const shuffledDescriptive = [...descriptive].sort(() => Math.random() - 0.5);
    const shuffledQuestions = [...shuffledMcqs, ...shuffledDescriptive];
    setShuffledQuestions(shuffledQuestions);
  }, [questions]);
  



  const handleAnswerChange = (
    id: number,
    question: string,
    type: string,
    answer: string,
    options?: string[]
  ) => {
    const newQuestion: AttemptedQuestion = {
      id,
      question,
      options: options ? options : undefined,
      type: type,
      attemptedUserAnswer: answer,
    };

    const existingIndex = attemptedQuestions.findIndex((q) => q.id === id);

    if (existingIndex !== -1) {
      const updatedQuestions = [...attemptedQuestions];
      updatedQuestions[existingIndex] = newQuestion;
      setAttemptedQuestions(updatedQuestions);
    } else {
      setAttemptedQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }
  };

  const handleSubmit = () => {
    let prompt =
      "Please evaluate the user's attempted test questions and provide the correct answer if the user's answer is incorrect.\n\n";

    questions.forEach((question, index) => {
      const attemptedQuestion = attemptedQuestions.find(
        (q) => q.id === question.id
      );
      if (attemptedQuestion) {
        prompt += `Q${index + 1}: ${question.question}\n Options: ${question.options}\n`;
        if (
          attemptedQuestion.type === "MCQS" ||
          attemptedQuestion.type === "True/False"
        ) {
          prompt += `User's Answer: ${attemptedQuestion.attemptedUserAnswer}\n\n`;
        } else if (attemptedQuestion.type === "Descriptive") {
          prompt += `User's Answer: ${attemptedQuestion.attemptedUserAnswer}\n\n`;
        }
      } else {
        prompt += `Q${index + 1}: ${question.question}\n Options: ${question.options}\n type: ${question.type}\n User's Answer: ${""}\n\n`;
      }
    });

    return prompt;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-6 mb-20 mt-10">
        <h1 className="text-3xl font-semibold mb-1">{title}</h1>
        <p className="mb-8">{description}</p>
        {shuffledQuestions?.map((questionData, index) => (
          <div key={index} className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">{`Q${index + 1}. ${questionData.question
              }`}</h3>
            {questionData.type === "MCQS" && (
              <ul className="list-none pl-0">
                {questionData.options?.map((option, optionIndex) => (
                  <li key={optionIndex} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={optionIndex}
                        className="form-radio text-black"
                        onChange={() =>
                          handleAnswerChange(
                            questionData.id,
                            questionData.question,
                            questionData.type,
                            option,
                            questionData.options
                          )
                        }
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
            {questionData.type === "True/False" && (
              <div className="flex space-x-2 items-center mb-2">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value="True"
                  className="form-radio text-black"
                  onChange={() =>
                    handleAnswerChange(
                      questionData.id,
                      questionData.question,
                      questionData.type,
                      "True",
                      ["True", "False"]
                    )
                  }
                />
                <span className="ml-2">True</span>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value="False"
                  className="form-radio text-black"
                  onChange={() =>
                    handleAnswerChange(
                      questionData.id,
                      questionData.question,

                      questionData.type,
                      "False",
                      ["True", "False"]
                    )
                  }
                />
                <span className="ml-2">False</span>
              </div>
            )}
            {questionData.type === "Descriptive" && (
              <textarea
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="Your answer here..."
                onChange={(e) =>
                  handleAnswerChange(
                    questionData.id,
                    questionData.question,
                    questionData.type,
                    e.target.value
                  )
                }
              ></textarea>
            )}
          </div>
        ))}
      </div>
      <div className="fixed top-16 left-0 right-0 shadow-lg bg-white  z-50 py-2 px-4">
        <div className="flex  items-center space-x-4 w-full">
          <Progress value={progress} className="max-w-4xl" />
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-gray-600">{`Time elapsed: ${Math.floor(
              time / 3600
            )} hr ${Math.floor((time % 3600) / 60)} min ${time % 60} sec`}</p>
            <p className="text-gray-600">Duration: {duration} min</p>
          </div>
          <form
            action={async () => {
              const prompt = handleSubmit();
              const result = await submitAiTest(prompt, testId);

              // const gotScore = result?.reduce((total: number, question: any) => total + question.score, 0);
              const totalCorrectAnswers = result?.questions?.filter(
                (question: any) => question.correctAnswer === question.userAnswer
              ).length || 0;
              await submitTestResult(result, testId);
            }}
          >
            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
