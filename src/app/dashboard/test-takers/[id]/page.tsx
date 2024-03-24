import { getPublishedTests } from "@/actions/test";
import { getTestTakersById } from "@/actions/test-taker";
import ProfileCard from "@/components/common/ProfileCard";
import TestCard from "@/components/common/TestCard";
import { Test } from "@/types/types";
import React from "react";

async function getProfileDetails(id: string) {
  const data = await getTestTakersById(id);
  console.log(data);
  return data;
}

async function getTests(id: string) {
  const data = await getPublishedTests(id);
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

  const testDetails = (await getTests(id)) as Test[];
  console.log(testDetails);

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
      <div className="grid grid-cols-3 gap-5 mt-4">
        {testDetails?.map((test) => (
          <TestCard
            key={test.id}
            id={test.id}
            title={test.title}
            description={test.description as string}
            duration={test.duration}
            userId={test.userId}
            startAt={test.startAt}
            published={test.published}
            instructor={test.user?.name as string}
            isPurchased={test.purchased}
          />
        ))}
      </div>
    </div>
  );
}
