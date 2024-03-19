import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function RolePage() {
  const user = await currentUser();
  const { userId } = auth();
  const email = user?.emailAddresses[0].emailAddress;

  const existingUser = await db.user.findUnique({
    where: {
      id: userId as string,
    },
  });

  if (existingUser) {
    redirect("/dashboard");
  }

  const createUser = async (formData: FormData) => {
    "use server";

    console.log("Form Data", formData);
    const role = formData.get("role") as string;

    try {
      const res = await db.user.create({
        data: {
          id: userId as string,
          name: user?.firstName + " " + user?.lastName,
          email: email as string,
          role: role,
        },
      });
    } catch (e) {
      console.log("Error", e);
    }
    redirect("/dashboard");
  };

  return (
    <div>
      <form action={createUser}>
        <Select name="role">
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Role</SelectLabel>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="instructor">Instructor</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className={cn("mt-5")}>Submit</Button>
      </form>
    </div>
  );
}
