import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getAllPayments } from "@/actions/payment";
import { Payment } from "@/types/types";

async function getData(): Promise<Payment[]> {
  const data = await getAllPayments();
  console.log(data);
  return data as Payment[];
}
export default async function PaymentPage() {
  const data = await getData();

  return (
    <div className="container h-screen mx-auto">
      <h1 className="text-2xl font-bold mb-5">Payments list</h1>
      <DataTable columns={columns} data={data} filterColumn="userEmail"/>
    </div>
  );
}
