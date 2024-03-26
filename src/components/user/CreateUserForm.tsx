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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createUser } from "@/actions/user";

const formSchema = z.object({
  role: z.string({
    required_error: "Role is required",
  }),
  name: z.string().nonempty({ message: "Name is required" }).refine(value => /^[A-Za-z\s]+$/.test(value), {
    message: "Invalid name. Only alphabetic characters are allowed",
    params: {},
  }),


  location: z.string({
    required_error: "Location is required",
  }).refine(value => /^[A-Za-z0-9\s]+$/.test(value), {
    message: "Invalid location. Only alphabets, numbers, and spaces are allowed",
    params: {},
  }),
  mobile: z.string().nonempty({ message: "Number is required" }).refine(value => /^[0-9\b+]+$/.test(value), {
    message: "Invalid mobile number. Only numbers and '+' are allowed",
    params: {},
  }),
});

export default function CreateUserForm({ fname,lname}: {fname:String,lname:String}) {
  console.log(fname,lname );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
    mode: 'onChange',
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          Welcome aboard! Please provide a few more details to help us tailor
          your experience. Your role, contact number, and location will enable
          personalized services and support
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const formData = new FormData();
                formData.append('role', form.getValues().role);
                formData.append('name', form.getValues().name);
                formData.append('location', form.getValues().location);
                formData.append('mobile', form.getValues().mobile);

                await createUser(formData);
                // Handle successful user creation...
              } catch (error) {
                // Show notification or popup with error message
                alert((error as Error).message);
              }
            }}
            className="space-y-8 w-full"
          >
          {!fname&&<FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field}
                     />
                  </FormControl>
                  <FormDescription>
                    This is your public display Name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="role"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="instructor">Instructor</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <Input placeholder="+92 3446615145" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display Mobile Number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Lahore, Pakistan" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display Location.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
