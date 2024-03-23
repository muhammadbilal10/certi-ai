"use client";
import React, { useState, useEffect } from 'react';

interface Question {
  question: string;
  options: string[];
  answer: number;
}

const TestPage: React.FC = () => {
  // Sample data array for quiz questions and answers
  const quizData: Question[] = [
    {
      question: "If you want to import just the Component from the React library, what syntax do you use?",
      options: [
        "import React.Component from 'react'",
        "[ Component ] from 'react'",
        "import Component from 'react'",
        "{ Component } from 'react'"
      ],
      answer: 3 // Index of the correct answer in the options array
    },
    {
      question: "If a function component should always render the same way given the same props, what is a simple performance optimization available for it?",
      options: [
        "Wrap it in the React.memo higher-order component.",
        "Implement the useReducer Hook.",
        "Implement the useMemo Hook.",
        "Implement the shouldComponentUpdate lifecycle method."
      ],
      answer: 0
    },
    {
      question: "How do you fix the syntax error that results from running this code?",
      options: [
        "Wrap the object in parentheses.",
        "Call the function from another file.",
        "Add a return statement before the first curly brace.",
        "Replace the object with an array."
      ],
      answer: 0
    },
    {
      question: "If you see the following import in a file, what is being used for state management in the component?",
      options: [
        "React Hooks",
        "Stateful components",
        "Math",
        "Class components"
      ],
      answer: 0
    }
  ];

  const [time, setTime] = useState<number>(0); // Time in seconds
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [answers, setAnswers] = useState<number[]>(new Array(quizData.length).fill(-1));
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (questionIndex: number, selectedOptionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedOptionIndex;
    setAnswers(newAnswers);
    if (startTime === null) {
      setStartTime(new Date());
    }
  };

  const handleSubmit = () => {
    const isConfirmed = window.confirm("Are you sure you want to submit the test?");
    if (isConfirmed) {
      setEndTime(new Date());
      setShowResult(true);
    }
  };
  

  const calculateResult = () => {
    if (!endTime || !startTime) return null;

    const totalTime = Math.floor((endTime.getTime() - startTime.getTime()) / 1000); // in seconds
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;

    const attemptedQuestions = answers.filter(answer => answer !== -1);
    const correctAnswers = attemptedQuestions.reduce((total, answer, index) => {
      return answer === quizData[index].answer ? total + 1 : total;
    }, 0);
    const wrongAnswers = attemptedQuestions.length - correctAnswers;
    const overallResult = ((correctAnswers / attemptedQuestions.length) * 100).toFixed(2);

    return {
      timeTaken: `${hours} hr ${minutes} min ${seconds} sec`,
      questionsAttempted: attemptedQuestions.length,
      correctAnswers,
      wrongAnswers,
      overallResult
    };
  };

  const resetQuiz = () => {
    setTime(0);
    setStartTime(null);
    setEndTime(null);
    setAnswers(new Array(quizData.length).fill(-1));
    setShowResult(false);
  };

  const renderResultCircle = () => {
    const { questionsAttempted } = calculateResult() || { questionsAttempted: 0 };
    const totalQuestions = quizData.length;
    return (
      <div className="flex items-center justify-center w-24 h-24 rounded-full border-2 border-solid border-gray-300" style={{ borderColor: '#CF4F41' }}>
        <p className="text-lg font-semibold">
          {questionsAttempted}/{totalQuestions}
        </p>
      </div>
    );
  };
  

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">Test Form</h1>
      {showResult ? (
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h2 className="text-lg font-semibold mb-4">Test Result</h2>
          {calculateResult() && (
            <>
              <div className="flex items-center justify-center mb-4">
                {renderResultCircle()}
              </div>
              <p>Test : OCJA</p>
              <p>Time taken : {calculateResult()?.timeTaken}</p>
              <p>Questions attempted : {calculateResult()?.questionsAttempted}</p>
              <p>Correct answers : {calculateResult()?.correctAnswers}</p>
              <p>Wrong answers : {calculateResult()?.wrongAnswers}</p>
              <p>Overall result : {calculateResult()?.overallResult}%</p>
            </>
          )}
          <button onClick={resetQuiz} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Retake Quiz
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {quizData.map((questionData, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">{`Q${index + 1}. ${questionData.question}`}</h2>
              <ul className="list-none pl-0">
                {questionData.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="mb-2">
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        name={`question-${index}`} 
                        value={optionIndex} 
                        className="form-radio text-blue-500" 
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
              <p className="text-gray-600">{`Time elapsed: ${Math.floor(time / 3600)} hr ${Math.floor((time % 3600) / 60)} min ${time % 60} sec`}</p>
              <p className="text-gray-600">Duration: 1 hr</p>
            </div>
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  };
  
  export default TestPage;
  