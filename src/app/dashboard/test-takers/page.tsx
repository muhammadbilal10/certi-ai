import StatCard from "@/components/common/StatCard";
import { DataTable } from "@/components/ui/data-table";
import { FilePen, HandCoins, PersonStandingIcon } from "lucide-react";
import { TestTaker, columns } from "./columns";
import { Modal } from "@/components/common/Modal";
import { getAllTestTakers } from "@/actions/test-taker";

async function getData(): Promise<TestTaker[]> {
  const data = await getAllTestTakers();
  console.log(data);

  return data as TestTaker[];
}

export default async function TestTakerPage() {
  const data = await getData();

  return (
    <div className="container  mx-auto">
      <div className="flex justify-between mb-2">
        <h1 className="text-2xl font-bold">Test Takers list</h1>
        {/* <Modal value="Add Test Taker" /> */}
      </div>

      <DataTable columns={columns} data={data} filterColumn="email"/>
    </div>
  );
}
