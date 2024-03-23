import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/common/CheckoutFom";
import { getSpecificTest } from "@/actions/test";
import Checkout from "@/components/common/Checkout";
import { Test } from "@/types/types";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const backendUrl = `https://uctqy6nhdk.us.aircode.run/payment`;

const fetchPaymentIntent = async (description: string, price: number) => {
  // const price = 800;
  // console.log(course?.price);
  const res = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currency: "gbp",
      amount: price,
      description: description,
    }),
  });
  const { client_secret: clientSecret } = await res.json();
  return clientSecret;
};

async function getTestDetails(id: number) {
  const data = await getSpecificTest(id);
  return data;
}

export default async function page({ params }: any) {
  const id = params.id;
  const testDetails = (await getTestDetails(Number(id))) as Test;
  console.log(testDetails);

  const clientSecret = (await fetchPaymentIntent(
    testDetails?.title as string,
    100
  )) as any;

  console.log(clientSecret);

  return <Checkout clientSecret={clientSecret} testDetails={testDetails} />;
}