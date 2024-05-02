import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="grid grid-cols-12  mx-auto gap-8">
      <div className="max-w-2xl pt-60 col-span-12 lg:col-span-6  px-6 mx-auto">
        <h1 className="text-4xl sm:text-6xl font-bold mt-40px ">
          The Best Way For Your Learning
        </h1>
        <p className="text-gray-500 mt-6">
          Discover your potential with our internationally recognized
          certification tests. Learn at your own pace, enhance your career, and
          join a community eager for growth. Competitive pricing, expert
          support, and unlimited possibilities await!
        </p>

        <div className="mt-10">
          <Button asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6 min-h-screen">
        <div className="h-screen">
        <Image
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="hero image"
          width={500}
          height={500}
          className=" h-full w-full"
        />
        </div>
      </div>
    </div>
  );
}
