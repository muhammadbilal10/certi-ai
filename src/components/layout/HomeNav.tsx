import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HomeNav() {
  return (
    <div className="pl-8  absolute lg:w-1/2 w-full">
      <div className="flex items-start justify-between mt-5">
        <Image
          src="https://i.postimg.cc/nLFKWJ5z/Rectangle-1.png"
          alt="hero image"
          width={220}
          height={120}
          className="object-cover"
        />
        <div className="space-x-4 mr-10 self-center mb-10">
          <Button asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
