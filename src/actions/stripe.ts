"use server";
// // @see https://docs.aircode.io/guide/functions/
// import aircode from "aircode";
// const Stripe = require('stripe');
import Stripe from "stripe";

type Params = {
  amount: number;
  currency: string;
  description: string;
};

export default async function stripeapi(
  amount: number,
  currency: string,
  description: string,
  name: string,
  address: string
) {
  if (process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
      typescript: true,
    });

    console.log(amount);

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency,
        description,
        metadata: {
          customer_name: name,
          customer_address: address || "Lahore",
        },
      });

      const payment_id = paymentIntent.id;

      // context.status(200);
      return paymentIntent.client_secret;
    } catch (e: any) {
      // context.status(500);
      console.log(e);
      return {
        message: e.message,
      };
    }
  }

  return {
    message: "Please add stripe api key",
  };
}
