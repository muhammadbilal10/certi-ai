"use client";
import Image from "next/image";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const CheckoutForm = ({ testDetails }: { testDetails: any }) => {
  console.log(testDetails?.price);

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_SUCCESS_URL}${testDetails?.id}?price=${testDetails?.price}`,
      },
    });

    if (result.error) {
      console.log(result.error.message);
      setLoading(false);
    } else {
      alert("Payment Successfull");
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
          <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
        </div>
        <div className="grid gap-10  sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8 ">
            <p className="text-xl font-medium">Order Details</p>
            <p className="text-gray-400">Check your item.</p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <Image
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={
                    testDetails.formData?.imageUrl ||
                    "https://github.com/shadcn.png"
                  }
                  alt=""
                  width={112}
                  height={96}
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{testDetails?.title}</span>

                  <p className="text-lg font-bold">
                    ${testDetails?.price || 100}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10  px-4 pt-8 lg:mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                  Complete your order by providing your payment details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentElement />
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {" "}
                    ${testDetails?.price || 100}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={cn("mt-4 mb-8 w-full rounded-md")}
                  disabled={!stripe || loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
