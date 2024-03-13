import StatCard from "@/components/common/StatCard";
import { FilePen, HandCoins, PersonStandingIcon } from "lucide-react";

export default function Dashboardpage() {
  const stats = [
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
            value={stat.count}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
}
