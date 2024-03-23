import { getInstructorById } from "@/actions/instructor";
import { getAllTests, getSpecificTest, getTestsByUserId } from "@/actions/test";
import ProfileCard from "@/components/common/ProfileCard";
import TestCard from "@/components/common/TestCard";
import { useRouter } from "next/router";
import test from "node:test";
import React from "react";

interface ProfileDetails {
  id: string;
  email: string;
  name: string | null;
  role: string | null;
  mobile: string | null;
  joinedAt: Date;
  profileImage: string | null;
  location: string | null;
}

async function getALlTest(id: string) {
  const data = await getTestsByUserId(id);
  return data;
}

async function getInstructor(id: string) {
  console.log(id);
  const data = await getInstructorById(id);
  return data;
}

export default async function ProfileDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params?.id;

  const profileDetials = (await getInstructor(id as string)) as ProfileDetails;
  console.log(profileDetials);

  const testDetails = await getALlTest(id as string);
  console.log(testDetails);

  return (
    <div className="px-10">
      <div>
        <h1 className="text-xl font-bold mb-4">Profile Details</h1>
      </div>
      <div>
        <ProfileCard {...profileDetials} totalTest={testDetails?.length} />
      </div>
      <div>
        <h1 className="text-xl font-bold mt-5">Test Created</h1>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-4">
        {testDetails?.map((test) => (
          <TestCard
            key={test.id}
            title={test.title}
            instructor={profileDetials.name as string}
            description={test.description}
            duration={test.duration}
            startAt={test.startAt}
            id={test.id}
            userId={test.userId}
          />
        ))}
      </div>
    </div>
  );
}
