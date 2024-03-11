import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Check, HandCoins, Mail, Map, MapPin, User } from "lucide-react";
import Image from "next/image";

type ProfileDetails = {
  id: string;
  name: string;
  gender: string;
  age: number;
  email: string;
  phone: string;
  joinedDate: string;
  address: string;
  role: string;
  profilePic: string;
};
export default function ProfileCard({
  name,
  email,
  phone,
  joinedDate,
  address,
  id,
  gender,
  role,
  profilePic,
}: ProfileDetails) {
  const userDescription = [
    {
      value: role,
      icon: <User size={20} />,
    },
    {
      value: address,
      icon: <MapPin size={20} />,
    },
    {
      value: email,
      icon: <Mail size={20} />,
    },
  ];
  const userStats = [
    {
      title: "Earning",
      value: "600$",
    },
    {
      title: "Test Taken",
      value: "15",
    },
  ];
  return (
    <div>
      <Card className="flex max-md:flex-col">
        <CardContent className="p-6">
          <Image
            src="https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-1.jpg"
            alt={name}
            height={160}
            width={160}
            className="h-40 w-40 rounded-md object-cover"
          />
        </CardContent>
        <CardHeader className="md:px-0">
          <CardTitle>
            <div className="flex gap-2 items-center">
              {name}
              <Check size={20} className="p-1 rounded-full bg-secondary" />
            </div>
          </CardTitle>
          <CardDescription>
            <div className="flex gap-6 max-sm:flex-col max-sm:gap-2">
              {userDescription.map((item, index) => (
                <div key={index} className="flex gap-1 items-center">
                  {item.icon}
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </CardDescription>
          <div>
            <div>
              <div className="flex space-x-4 mt-4">
                {userStats.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-2 border border-dashed rounded-md w-1/2"
                  >
                    <span className="text-2xl font-bold">{item.value}</span>
                    <span className="text-md text-gray-600 font-semibold">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}