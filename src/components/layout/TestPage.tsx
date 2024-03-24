"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  testId: number;
}

interface TestPageProps {
  questions: Question[];
  testTime: number;
  duration: number;
  title: string;
  description: string;
}

const TestPage: React.FC<TestPageProps> = ({
  questions,
  testTime,
  duration,
  description,
  title,
}) => {
  const [time, setTime] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1)
  );
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time >= testTime) {
        handleSubmit();
        clearInterval(timer);
      } else {
        setTime((prevTime) => prevTime + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [time, testTime]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}hr ${minutes}min ${seconds}sec`;
  };

  const handleAnswerChange = (
    questionIndex: number,
    selectedOptionIndex: number
  ) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedOptionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (!showResult) {
      setShowResult(true);
    }
  };

  const calculateResult = () => {
    const correctAnswers = answers.reduce(
      (total, answer, index) =>
        answer === questions[index].answer ? total + 1 : total,
      0
    );

    const overallResult = ((correctAnswers / questions.length) * 100).toFixed(
      2
    );

    return {
      timeTaken: formatTime(time),
      questionsAttempted: answers.filter((answer) => answer !== -1).length,
      correctAnswers,
      wrongAnswers: questions.length - correctAnswers,
      overallResult,
    };
  };

  const resetQuiz = () => {
    setTime(0);
    setAnswers(new Array(questions.length).fill(-1));
    setShowResult(false);
  };

  const renderResultCircle = () => {
    const { questionsAttempted } = calculateResult() || {
      questionsAttempted: 0,
    };
    const totalQuestions = questions.length;
    return (
      <div
        className="flex items-center justify-center w-24 h-24 rounded-full border-2 border-solid border-gray-300"
        style={{ borderColor: "#CF4F41" }}
      >
        <p className="text-lg font-semibold">
          {questionsAttempted}/{totalQuestions}
        </p>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8">
      {showResult ? (
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h1 className="text-3xl font-semibold mb-1">{title}</h1>
          <p className="mb-8">{description}</p>
          <h2 className="text-lg font-semibold mb-4">Test Result</h2>
          {calculateResult() && (
            <>
              <div className="flex items-center justify-center mb-4">
                {renderResultCircle()}
              </div>
              <p>Test : {title}</p>
              <p>Time taken : {calculateResult()?.timeTaken}</p>
              <p>
                Questions attempted : {calculateResult()?.questionsAttempted}
              </p>
              <p>Correct answers : {calculateResult()?.correctAnswers}</p>
              <p>Wrong answers : {calculateResult()?.wrongAnswers}</p>
              <p>Overall result : {calculateResult()?.overallResult}%</p>
            </>
          )}
          <Button onClick={resetQuiz} className=" mt-4">
            Retake Test
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          <h1 className="text-3xl font-semibold mb-1">{title}</h1>
          <p className="mb-8">{description}</p>
          {questions.map((questionData, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">{`Q${index + 1}. ${
                questionData.question
              }`}</h2>
              <ul className="list-none pl-0">
                {questionData.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={optionIndex}
                        className="form-radio text-black"
                        onChange={() => handleAnswerChange(index, optionIndex)}
                      />

                      <span className="ml-2">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {!showResult && (
        <div className="flex justify-between items-center mt-8">
          <div>
            <p className="text-gray-600">{`Time elapsed: ${Math.floor(
              time / 3600
            )} hr ${Math.floor((time % 3600) / 60)} min ${time % 60} sec`}</p>
            <p className="text-gray-600">Duration: {duration} min</p>
          </div>

          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      )}
    </div>
  );
};

export default TestPage;
