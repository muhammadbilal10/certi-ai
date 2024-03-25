import { createPayment } from "@/actions/payment";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function PaymentConfirmationPage({
  params,
  searchParams,
}: any) {
  const testId = params?.id;
  console.log("testId", testId);
  const price = searchParams?.price;
  console.log("price", price);
  await createPayment(Number(testId), Number(price));
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className={cn("max-w-md w-full")}>
        <CardHeader className={cn("items-center")}>
          <CheckCircle className={cn("text-green-500 w-12 h-12")} />
          <CardTitle
            className={cn("text-2xl font-semibold text-gray-800 mt-4")}
          >
            Payment Successful!
          </CardTitle>
          <CardDescription className={cn("text-center")}>
            Purchase successful! You will find your test in the &apos;My
            Tests&apos; section. Good luck!
          </CardDescription>
        </CardHeader>
        <CardFooter className={cn("items-center justify-between")}>
          <Button asChild variant="secondary">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/test-environment`}>Go to My Tests</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
