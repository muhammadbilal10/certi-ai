import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HomeNav() {
  return (
    <div className="pl-0 px-8 z-50 absolute xl:w-1/2 w-full">
      <div className="flex items-center justify-between mt-5">
        <div className="h-150px] w-[150px]">
          <Image
            src="https://i.postimg.cc/nLFKWJ5z/Rectangle-1.png"
            alt="hero image"
            width={220}
            height={120}
            className="h-full w-full"
          />
        </div>
        <div className="hidden sm:flex sm:gap-x-12">
          <Link
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Home
          </Link>
          <Link
            href="#feature-test"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Tests
          </Link>
          <Link
            href="#about-us"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            About Us
          </Link>
          {/* <Link
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Contact Us
          </Link> */}
          
        </div>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
