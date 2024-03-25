"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createTest, updateTest } from "@/actions/test";

const formSchema = z
  .object({
    question: z.string().min(2, {
      message: "Question must be at least 2 characters.",
    }),
    options: z.array(z.string()),
    answer: z.coerce
      .number({
        required_error: "Answer is required",
        invalid_type_error: "Answer must be a number",
      })
      .positive({
        message: "Answer must be a positive integer.",
      }),
  })
  .refine((data) => data.answer <= data.options.length, {
    message: "Answer must not be greater than the number of options.",
  });

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

export default function TestQuestionForm({
  testDetails,
  setTestDetails,
  nextStep,
  prevStep,
  type,
}: {
  testDetails: TestDetails | undefined;
  setTestDetails: (testDetails: TestDetails) => void;
  nextStep: () => void;
  prevStep: () => void;
  type: string;
}) {
  console.log(type);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      options: [],
      answer: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log(testDetails);
    if (testDetails?.questions) {
      console.log("testDetails.questions");
      const updatedTestDetails = {
        ...testDetails,
        questions: [
          ...testDetails.questions,
          {
            question: values.question,
            options: values.options,
            answer: values.answer,
          },
        ],
      };
      setTestDetails(updatedTestDetails as TestDetails);
    } else {
      const updatedTestDetails = {
        ...testDetails,
        questions: [
          {
            question: values.question,
            options: values.options,
            answer: values.answer,
          },
        ],
      };
      setTestDetails(updatedTestDetails as TestDetails);
    }
    console.log(testDetails);
    form.reset();
    setOptions([]);
    setLoading(false);
  }

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? value : option
    );
    setOptions(updatedOptions);
    form.setValue("options", updatedOptions);
  };

  console.log(testDetails);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Craft Your Questions</CardTitle>
        <CardDescription>
          Tailor engaging tests with ease. Add questions, set options, and
          specify correct answers in a few clicks. Ready to create an impactful
          learning experience?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          {testDetails?.questions?.map((question, index) => (
            <div key={index} className="">
              <div className="bg-white mb-4">
                <div className="text-xl font-medium text-gray-900 mb-4 flex space-x-2">
                  <span>{index + 1}.</span>
                  <span>{question.question}</span>
                </div>

                <div className="space-y-2 ml-4">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="space-x-2">
                      <span>{optionIndex + 1}.</span>
                      <span
                        className={`${
                          optionIndex + 1 === question.answer
                            ? "text-green-600 font-medium"
                            : "text-gray-900"
                        }`}
                      >
                        {option}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button type="button">
              <Plus className="h-4 w-4 mr-2" />
              Add question
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Question</DialogTitle>

              <DialogDescription>
                Make add to your question here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 w-full"
                >
                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="OCP" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public question display.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correct Option</FormLabel>
                        <FormControl>
                          <Input placeholder="0" {...field} type="number" />
                        </FormControl>
                        <FormDescription>
                          Add correct option of a question.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {options.map((option, index) => (
                    <div key={index}>
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}

                  <Button type="button" variant="secondary" onClick={addOption}>
                    <Plus className="h-4 w-4 mr-2" />
                    Options
                  </Button>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        disabled={form.getValues("question") === ""}
                        type="submit"
                      >
                        Add
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex justify-between mt-4">
          <Button onClick={prevStep}>Prev</Button>
          <Button
            disabled={testDetails?.questions?.length === 0}
            onClick={() =>
              type !== "edit"
                ? createTest({ testDetails })
                : updateTest({ testDetails })
            }
          >
            {type !== "edit" ? "Submit" : "edit"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
