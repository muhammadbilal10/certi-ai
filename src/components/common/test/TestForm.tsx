"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, set } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Test } from "@/types/types";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  })
  .refine(value => /^[A-Za-z\s]+$/.test(value), {
    message: "Invalid title. Only alphabets and spaces are allowed",
    params: {},
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  })
  ,
  duration: z.coerce
    .number({
      required_error: "Duration is required",
      invalid_type_error: "Duration is required",
    })
    .positive("Duration must be a positive number")
    .min(5, "Duration must be at least 5 minutes")
    .max(180, "Duration cannot exceed 180 minutes"),
  price: z.coerce
    .number({
      required_error: "price is required",
      invalid_type_error: "price is required",
    })
    .positive({
      message: "Price must be a positive integer.",
    })
    .min(1, {
      message: "Price must be at least 1 dollar.",
    }),
  startAt: z.date({
    required_error: "A test date is required.",
  }),
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

export default function TestForm({
  nextStep,
  prevStep,
  testDetails,
  setTestDetails,
  type,
}: {
  testDetails: TestDetails | undefined;
  nextStep: () => void;
  prevStep: () => void;
  setTestDetails: (testDetails: TestDetails) => void;
  type: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: testDetails?.title,
      description: testDetails?.description,
      duration: testDetails?.duration,
      startAt: testDetails?.startAt,
      price: testDetails?.price,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (testDetails?.id && testDetails?.questions) {
      const updatedTestDetails: TestDetails = {
        ...values,

        id: testDetails?.id,
        userId: testDetails?.userId,
        questions: testDetails?.questions,
      };
      setTestDetails(updatedTestDetails);
    } else if (testDetails?.questions) {
    } else setTestDetails(values as TestDetails);

    nextStep();
  }
  console.log(testDetails);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Design Your Test Adventure</CardTitle>
        <CardDescription>
          Craft the perfect quiz: Set titles, detail descriptions, determine
          duration, price, and schedule. Begin creating your engaging quiz now!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="OCP" {...field} className="max-w-sm" />
                  </FormControl>
                  <FormDescription>
                    This is your public test display title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="This is a test description."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4 max-w-xl">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="30 min" {...field} type="number" />
                    </FormControl>
                    <FormDescription>
                      This is your public test display duration.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price($)</FormLabel>
                    <FormControl>
                      <Input placeholder="100 $" {...field} type="number" />
                    </FormControl>
                    <FormDescription>
                      This is your public test display price.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full px-3 py-2 text-left font-normal ",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This Date is used to schedule the test.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end ">
              <Button type="submit" className="w-20">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
