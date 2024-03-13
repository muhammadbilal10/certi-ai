import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HomeNav() {
  return (
    <div className="pl-8 pt-6 absolute lg:w-1/2 w-full">
      <div className="flex items-center justify-between ">
        <Image
          src="https://s3-alpha-sig.figma.com/img/106a/d7e2/91cc33fdeb6e0feb9ca20a2303150c5f?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BxVeKLUuSU3Nb1KE47U-~nceGa-rO~k9J1-BkenCLWijBXcVY83gfSM~CXGOWPbReT87G2BBtPWxRTtj65QVnl7oA3jGvKPYDajveGDqExpspWstKG~1P7rAXs~OUBjdjkilCDxx1ZfuxOF~SnEu3~8naQjgVP3FsiHQPRf2H0UHo-6fAOaSOASmYHQVYI1ErAwzT3qDvc8mVKIFEKUv9yVeBtGnvW8szitP2wGRWv6-DQWXGZh-iLpUe33RIFfzfx8jMWZiCKsBDyVxieBXcHqKyCjrZv9CLfX9OvnR5UKr52CY9p9kFppAAIrnl148hPsD1NPL5hMufaytddClww__"
          alt="hero image"
          width={60}
          height={60}
          className="object-cover"
        />
        <div className="space-x-4 mr-10">
          <Button asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
