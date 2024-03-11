import ProfileCard from "@/components/common/ProfileCard";
import TestCard from "@/components/common/TestCard";
import { useRouter } from "next/router";
import React from "react";

export default function ProfileDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params?.id;

  const profileDetials = {
    id: id,
    name: "Babar Azam",
    gender: "female",
    age: 25,
    email: "mb0587494@gmail.com",
    phone: "1234567890",
    joinedDate: "2021-08-01",
    address: "Lahore, Pakistan",
    role: "admin",
    profilePic: "https://randomuser.me/api/portraits",
  };

  const TestDetails = {
    id: "1",
    name: "OCPJP 8 Test",
    instructor: "MR Anwar Shah",
    time: "12:00 PM",
    date: "12/12/2021",
  };

  return (
    <div className="px-10">
      <div>
        <h1 className="text-xl font-bold mb-4">Profile Details</h1>
      </div>
      <div>
        <ProfileCard {...profileDetials} />
      </div>
      <div>
        <h1 className="text-xl font-bold mt-5">Test Purchased</h1>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-4">
        <TestCard {...TestDetails} />
        <TestCard {...TestDetails} />
        <TestCard {...TestDetails} />
        <TestCard {...TestDetails} />
        <TestCard {...TestDetails} />
        <TestCard {...TestDetails} />
        <TestCard {...TestDetails} />
        <TestCard {...TestDetails} />
        <TestCard {...TestDetails} />
        <TestCard {...TestDetails} />
        <TestCard {...TestDetails} />
        <TestCard {...TestDetails} />
      </div>
    </div>
  );
}
