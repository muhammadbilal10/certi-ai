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
import { FormField } from "@/components/ui/form";
import CreateUserForm from "@/components/user/CreateUserForm";

export default async function RolePage() {
  const user = await currentUser();
  const { userId } = auth();
  const email = user?.emailAddresses[0].emailAddress;

  const fname  = user?.firstName as string;
  const lname = user?.lastName as string;


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
    const location = formData.get("location") as string;
    const mobile = formData.get("mobile") as string;

    try {
      const res = await db.user.create({
        data: {
          id: userId as string,
          name: user?.firstName + " " + user?.lastName,
          email: email as string,
          role: role,
          profileImage: user?.imageUrl,
          location: location,
          mobile: mobile,
        },
      });
    } catch (e) {
      console.log("Error", e);
    }
    redirect("/dashboard");
  };

  return (
    <div>
      <CreateUserForm fname={fname} lname={lname}/>
      {/* <form action={createUser}>
       
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
      </form> */}
    </div>
  );
}
