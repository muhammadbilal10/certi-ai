import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 lg:px-8 mx-auto gap-8 h-screen">
      <div className="max-w-2xl pt-60 lg:col-span-6  px-6 mx-auto">
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
      <div className="lg:col-span-6 inset-0 lg:absolute  lg:left-[50%] lg:right-0">
        <Image
          src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
          alt="hero image"
          width={500}
          height={500}
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
}
