import { DataTable } from "@/components/ui/data-table";
import { Payment, columns } from "./columns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 1000,
      status: "pending",
      email: "m@example.com",
      name: "Micheal",
      date: "2021-10-01",
      transactionId: "123456",
      mobile: "1234567890",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "processing",
      email: "mb0587494@gmail.com",
      name: "Bilal",
      date: "2021-10-01",
      transactionId: "173456",
      mobile: "1234567890",
    },
    {
      id: "83af71b5",
      amount: 150,
      status: "pending",
      email: "jane.doe@example.com",
      name: "Jane Doe",
      date: "2021-10-02",
      transactionId: "234567",
      mobile: "1234567891",
    },
    {
      id: "84bd75f2",
      amount: 250,
      status: "failed",
      email: "john.smith@example.com",
      name: "John Smith",
      date: "2021-10-02",
      transactionId: "345678",
      mobile: "1234567892",
    },
    {
      id: "95ce78g3",
      amount: 50,
      status: "pending",
      email: "sara.connor@example.com",
      name: "Sara Connor",
      date: "2021-10-03",
      transactionId: "456789",
      mobile: "1234567893",
    },
    {
      id: "a6df79h4",
      amount: 200,
      status: "processing",
      email: "luke.skywalker@example.com",
      name: "Luke Skywalker",
      date: "2021-10-03",
      transactionId: "567890",
      mobile: "1234567894",
    },
    {
      id: "b7eg80i5",
      amount: 300,
      status: "pending",
      email: "leia.organa@example.com",
      name: "Leia Organa",
      date: "2021-10-04",
      transactionId: "678901",
      mobile: "1234567895",
    },
    {
      id: "c8fh91j6",
      amount: 400,
      status: "failed",
      email: "han.solo@example.com",
      name: "Han Solo",
      date: "2021-10-04",
      transactionId: "789012",
      mobile: "1234567896",
    },
    {
      id: "d9gi02k7",
      amount: 550,
      status: "pending",
      email: "chewbacca@example.com",
      name: "Chewbacca",
      date: "2021-10-05",
      transactionId: "890123",
      mobile: "1234567897",
    },
    {
      id: "e0hj13l8",
      amount: 600,
      status: "processing",
      email: "lando.calrissian@example.com",
      name: "Lando Calrissian",
      date: "2021-10-05",
      transactionId: "901234",
      mobile: "1234567898",
    },
    {
      id: "f1ik24m9",
      amount: 750,
      status: "pending",
      email: "qui.gon.jinn@example.com",
      name: "Qui-Gon Jinn",
      date: "2021-10-06",
      transactionId: "012345",
      mobile: "1234567899",
    },
    {
      id: "g2jl35n0",
      amount: 850,
      status: "failed",
      email: "obiwan.kenobi@example.com",
      name: "Obi-Wan Kenobi",
      date: "2021-10-06",
      transactionId: "1234560",
      mobile: "1234567800",
    },
    {
      id: "h3km46o1",
      amount: 950,
      status: "pending",
      email: "mace.windu@example.com",
      name: "Mace Windu",
      date: "2021-10-07",
      transactionId: "234561",
      mobile: "1234567811",
    },
    {
      id: "i4ln57p2",
      amount: 1050,
      status: "processing",
      email: "yoda@example.com",
      name: "Yoda",
      date: "2021-10-07",
      transactionId: "345672",
      mobile: "1234567822",
    },
  ];
}
export default async function PaymentPage() {
  const data = await getData();

  return (
    <div className="container h-screen mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
