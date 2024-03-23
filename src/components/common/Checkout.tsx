"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/common/CheckoutFom";
import { Test } from "@/types/types";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Checkout({
  testDetails,
  clientSecret,
}: {
  testDetails: Test;
  clientSecret: any;
}) {
  const options = {
    clientSecret: clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm testDetails={testDetails} />
    </Elements>
  );
}
