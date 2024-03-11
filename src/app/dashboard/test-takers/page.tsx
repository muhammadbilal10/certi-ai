import StatCard from "@/components/common/StatCard";
import { DataTable } from "@/components/ui/data-table";
import { FilePen, HandCoins, PersonStandingIcon } from "lucide-react";
import { TestTaker, columns } from "./columns";
import { Modal } from "@/components/common/Modal";

async function getData(): Promise<TestTaker[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 1000,
      status: "pending",
      email: "m@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "Micheal",
      date: "2021-10-01",
      mobile: "1234567890",
    },
    {
      id: "82af71c3",
      amount: 500,
      status: "pending",
      email: "a@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
      name: "Alex",
      date: "2021-10-02",
      mobile: "1234567891",
    },
    {
      id: "92bf82d4",
      amount: 750,
      status: "failed",
      email: "l@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Liam",
      date: "2021-10-03",
      mobile: "1234567892",
    },
    {
      id: "03cf93e5",
      amount: 600,
      status: "processing",
      email: "n@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
      name: "Noah",
      date: "2021-10-04",
      mobile: "1234567893",
    },
    {
      id: "14dg04f6",
      amount: 300,
      status: "pending",
      email: "o@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
      name: "Oliver",
      date: "2021-10-05",
      mobile: "1234567894",
    },
    {
      id: "25eh15g7",
      amount: 200,
      status: "pending",
      email: "e@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
      name: "Ethan",
      date: "2021-10-06",
      mobile: "1234567895",
    },
    {
      id: "36fi26h8",
      amount: 850,
      status: "failed",
      email: "j@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "Jacob",
      date: "2021-10-07",
      mobile: "1234567896",
    },
    {
      id: "47gj37i9",
      amount: 450,
      status: "processing",
      email: "w@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/8.jpg",
      name: "William",
      date: "2021-10-08",
      mobile: "1234567897",
    },
    {
      id: "58hk48j0",
      amount: 1250,
      status: "pending",
      email: "j@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/9.jpg",
      name: "James",
      date: "2021-10-09",
      mobile: "1234567898",
    },
    {
      id: "69il59k1",
      amount: 1750,
      status: "pending",
      email: "b@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/10.jpg",
      name: "Benjamin",
      date: "2021-10-10",
      mobile: "1234567899",
    },
    {
      id: "70jm60l2",
      amount: 900,
      status: "failed",
      email: "c@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
      name: "Carter",
      date: "2021-10-11",
      mobile: "1234567800",
    },
  ];
}

export default async function TestTakerPage() {
  const data = await getData();

  return (
    <div className="container h-screen mx-auto">
      <div className="flex justify-between mb-2">
        <h1 className="text-2xl font-bold">Test Takers list</h1>
        <Modal value="Add Test Taker" />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
