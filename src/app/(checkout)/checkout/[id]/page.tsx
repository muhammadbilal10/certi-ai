import React from "react";
import { getSpecificTest } from "@/actions/test";
import Checkout from "@/components/common/Checkout";
import { Test } from "@/types/types";
import stripeapi from "@/actions/stripe";
import { currentUser } from "@clerk/nextjs";
import { getUserById } from "@/actions/user";

const backendUrl = `https://uctqy6nhdk.us.aircode.run/payment`;

const fetchPaymentIntent = async (
  description: string,
  price: number,
  name: string,
  location: string
) => {
  // const price = 800;
  // console.log(course?.price);
  //   const res = await fetch(backendUrl, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       currency: "usd",
  //       amount: price,
  //       description: description,
  //     }),
  //   });
  //   const { client_secret: clientSecret } = await res.json();
  //   return clientSecret;
  // };
  const res = await stripeapi(price, "inr", description, name, location);
  return res;
};

async function getTestDetails(id: number) {
  const data = await getSpecificTest(id);
  return data;
}

export default async function page({ params }: any) {
  const user = await currentUser();
  const dbUser = await getUserById(user?.id as string);

  const id = params.id;
  const testDetails = (await getTestDetails(Number(id))) as Test;
  console.log(testDetails);

  const clientSecret = (await fetchPaymentIntent(
    testDetails?.title as string,
    testDetails?.price as number,
    dbUser?.name as string,
    dbUser?.location as string
  )) as any;

  console.log(clientSecret);

  return (
    <div>
      <Checkout clientSecret={clientSecret} testDetails={testDetails} />
    </div>
  );
}
