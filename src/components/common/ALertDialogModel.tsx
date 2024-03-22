"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { deleteTest } from "@/actions/test";

export default function ALertDialogModel({
  text,
  icon,
  handle,
  id,
}: {
  icon: React.ReactNode;
  text: string;
  id: number;
  handle?: () => void;
}) {
  async function handleDelete() {
    console.log(id);
    if (id) {
      try {
        await deleteTest(id);
      } catch (error) {
        console.log(error);
        console.error(error);
      }
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>{icon}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            {text} and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
