import { socials, FooterServices } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="px-8 py-8 mt-20 bg-gradient-to-r from-violet-100 to-[#f6d1c5]">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Image
            src="https://i.postimg.cc/nLFKWJ5z/Rectangle-1.png"
            alt="Company Logo"
            className="h-16 w-auto "
            width={100}
            height={100}
          />
          <p className="text-black-500 pt-4 md:mt-0 md:col-span-1 ">
            Certi-AI is Pakistan’s Largest Online Mock Test Portal
            Connecting Teachers and Students within & outside the country.
          </p>
        </div>
        <div className="flex flex-wrap justify-between md:col-span-4 gap-8">
          {FooterServices.map((service, index) => (
            <div key={index}>
              <h5 className="font-semibold uppercase mb-2.5">
                {service.title}
              </h5>
              <ul className="text-customeWhite-600">
                {service.services.map((ser, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      href="/"
                      className="hover:text-customeWhite-900"
                    >
                      {ser}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 border-t pt-8">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center flex-wrap">
          <div className="mb-4 lg:mb-0">
            <p className="font-bold">Subscribe to our newsletter</p>
            <p className="text-black-500">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* <Input type="email" placeholder="Email" />
            <Button>Subscribe</Button> */}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center flex-wrap">
          <p className="text-black-500 text-sm">
            © 2024 Certi-AI, Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            {socials.map((social) => (
              <Link
                href={social.link}
                className="hover:text-primary"
                key={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;