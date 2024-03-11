import StatCard from "@/components/common/StatCard";
import { DataTable } from "@/components/ui/data-table";
import { FilePen, HandCoins, PersonStandingIcon } from "lucide-react";
import { TestTaker, columns } from "./columns";

async function getData(): Promise<TestTaker[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 1000,
      status: "pending",
      email: "m@example.com",
      profilePic: "https://randomuser.me/api/portraits,",
      name: "Micheal",
      date: "2021-10-01",
      mobile: "1234567890",
    },
  ];
}

export default async function TestTakerPage() {
  const data = await getData();
  const instructorStats = [
    {
      title: "Total Instructor",
      count: 5,
      icon: (
        <PersonStandingIcon
          size={48}
          className=" text-[#757fef]"
          strokeWidth={1}
        />
      ),
    },
    {
      title: "Total Test Takers",
      count: 100,
      icon: <FilePen size={48} className=" text-[#757fef]" strokeWidth={1} />,
    },
    {
      title: "Total Payment",
      count: "₹ 10000",
      icon: <HandCoins size={48} className=" text-[#757fef]" strokeWidth={1} />,
    },
  ];
  return (
    <div className="container h-screen mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
