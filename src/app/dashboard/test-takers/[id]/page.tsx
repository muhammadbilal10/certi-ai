import { getTestTakersById } from "@/actions/test-taker";
import ProfileCard from "@/components/common/ProfileCard";
import TestCard from "@/components/common/TestCard";
import { useRouter } from "next/router";
import React from "react";

async function getProfileDetails(id: string) {
  const data = await getTestTakersById(id);
  console.log(data);
  return data;
}
export default async function ProfileDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params?.id;

  const profileDetials = await getProfileDetails(id);

  const testDetails = [];

  return (
    <div className="px-10">
      <div>
        <h1 className="text-xl font-bold mb-4">Profile Details</h1>
      </div>
      <div>
        <ProfileCard
          id={profileDetials?.id || ""}
          name={profileDetials?.name || ""}
          email={profileDetials?.email || ""}
          mobile={profileDetials?.mobile || ""}
          role={profileDetials?.role || ""}
          profileImage={profileDetials?.profileImage || ""}
          location={profileDetials?.location || ""}
          joinedAt={profileDetials?.joinedAt || new Date()}
          totalTest={testDetails?.length || 0}
        />
      </div>
      <div>
        <h1 className="text-xl font-bold mt-5">Test Purchased</h1>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-4"></div>
    </div>
  );
}
