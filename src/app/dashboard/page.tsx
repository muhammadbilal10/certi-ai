import StatCard from "@/components/common/StatCard";
import { FilePen, HandCoins, PersonStandingIcon } from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs";
import { getAllTestTakers } from "@/actions/test-taker";
import { getAllInstructors } from "@/actions/instructor";

async function getTestTakers() {
  const data = await getAllTestTakers();
  console.log(data);
  return data;
}

async function getInstuctors() {
  const data = await getAllInstructors();
  console.log(data);
  return data;
}
export default async function Dashboardpage() {
  const testTakers = await getTestTakers();
  const instructors = await getInstuctors();

  const { userId } = auth();
  console.log("clerk: ", userId);
  const stats = [
    {
      title: "Total Instructor",
      count: instructors?.length,
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
      count: testTakers?.length,
      icon: <FilePen size={48} className=" text-[#757fef]" strokeWidth={1} />,
    },
    {
      title: "Total Payment",
      count: "₹ 1000",
      icon: <HandCoins size={48} className=" text-[#757fef]" strokeWidth={1} />,
    },
  ];
  return (
    <div className="min-h-screen mx-10 ">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.count || 0}
            icon={stat.icon}
          />
        ))}
      </div>
      <script
        async
        src="https://api.cronbot.ai/v1/widgets/app/app_dqxltxzqsal5"
      ></script>
    </div>
  );
}
