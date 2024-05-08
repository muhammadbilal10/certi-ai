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
import { Delete, DeleteIcon, Edit, Plus, Trash } from "lucide-react";

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

const formSchema = z.object({
  question: z.string().min(2, {
    message: "Question must be at least 2 characters.",
  }),
  options: z.array(z.string()),
  // answer: z.coerce
  //   .number({
  //     required_error: "Answer is required",
  //     invalid_type_error: "Answer must be a number",
  //   })
  //   .positive({
  //     message: "Answer must be a positive integer.",
  //   }),
});
// .refine((data) => data.answer <= data.options.length, {
//   message: "Answer must not be greater than the number of options.",
// });

type Question = {
  id: number;
  question: string;
  options: string[];
  type?: string;
  answer?: number;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<
    number | null
  >(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      options: [],
      // answer: 0,
    },
  });

  const handleEditQuestion = (index: number, question: Question) => {
    setEditingQuestionIndex(index);
    // alert(JSON.stringify(question.answer));
    form.setValue("question", question.question);
    setOptions(question.options);
    // form.setValue("answer", question.answer);
    setIsModalOpen(true);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (editingQuestionIndex !== null && testDetails?.questions) {
      const updatedQuestions = [...testDetails.questions];
      updatedQuestions[editingQuestionIndex] = {
        ...updatedQuestions[editingQuestionIndex],
        question: values.question,
        options: values.options,
        type: values.options.length > 0 ? "MCQS" : "Descriptive",
      };
      setTestDetails({ ...testDetails, questions: updatedQuestions });
      setEditingQuestionIndex(null);
    } else {
      const updatedTestDetails = {
        ...testDetails,
        questions: [
          ...(testDetails?.questions || []),
          {
            question: values.question,
            options: values.options,
            type: values.options.length > 0 ? "MCQS" : "Descriptive",
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
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
    form.setValue("options", updatedOptions);
  };

  const handleRemoveOption = (indexToRemove: number) => {
    const newOptions = options.filter((_, index) => index !== indexToRemove);
    setOptions(newOptions);
    form.setValue("options", newOptions);
  };

  const handleRemoveQuestion = (index: number) => {
    if (testDetails?.questions) {
      const updatedQuestions = [...testDetails.questions];
      updatedQuestions.splice(index, 1);
      setTestDetails({ ...testDetails, questions: updatedQuestions });
    }
  };

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
                  <div className="flex items-center space-x-4">
                    <span
                      className="cursor-pointer "
                      onClick={() => handleEditQuestion(index, question)}
                    >
                      <Edit className="h-5 w-5 text-primary" />
                    </span>
                    <span
                      className="cursor-pointer "
                      onClick={() => handleRemoveQuestion(index)}
                    >
                      <Delete className="h-5 w-5 text-primary" />
                    </span>
                  </div>
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
        <Button type="button" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add question
        </Button>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild></DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Question</DialogTitle>

              <DialogDescription>
                Make add to your question here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid py-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2 w-full"
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

                  {/* <FormField
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
                  /> */}

                  {options.map((option, index) => (
                    <div key={index} className="space-y-0">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                      />
                      <div
                        className="flex justify-end pt-2 cursor-pointer"
                        onClick={() => handleRemoveOption(index)}
                      >
                        <span className="text-primary ">
                          <Trash className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  ))}

                  <Button
                    disabled={options.length > 4}
                    type="button"
                    className=""
                    variant="secondary"
                    onClick={addOption}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Options
                  </Button>

                  <DialogFooter>
                    <Button
                      disabled={form.getValues("question") === ""}
                      type="submit"
                      onClick={() => {
                        if (form.getValues("question") !== "")
                          setIsModalOpen(false);
                      }}
                    >
                      Add
                    </Button>
                    <DialogClose asChild></DialogClose>
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
             {
              
              type !== "edit"
              ? createTest({ testDetails })
              : updateTest({ testDetails })
             }
            }
          >
            {type !== "edit" ? "Submit" : "edit"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
