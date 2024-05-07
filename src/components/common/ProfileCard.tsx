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

interface ProfileDetails {
  id: string;
  email: string;
  name: string | null;
  role: string | null;
  mobile: string | null;
  joinedAt: Date; // or string if you prefer to work with date as string
  profileImage: string | null;
  location: string | null;
  totalEarning?: number;
  totalTest?: number;
}

export default function ProfileCard({
  name,
  email,
  mobile,
  role,
  profileImage,
  location,
  totalEarning,
  totalTest,
}: ProfileDetails) {
  const userDescription = [
    {
      value: role,
      icon: <User size={20} />,
    },
    {
      value: location,
      icon: <MapPin size={20} />,
    },
    {
      value: email,
      icon: <Mail size={20} />,
    },
  ];
  const userStats = [
    ...(role !== "student"
      ? [
          {
            title: "Earning",
            value: "$"+totalEarning || "0$",
          },
        ]
      : []),
    {
      title: `Test ${role === "student" ? "Purchased" : "Created"}`,
      value: totalTest || "0",
    },
  ];
  return (
    <div>
      <Card className="flex max-md:flex-col min-w-52">
        <CardContent className="p-6">
          <Image
            src={
              profileImage ||
              "https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-1.jpg"
            }
            alt={name || "profile image"}
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
          <div className="text-sm text-muted-foreground">
            <div className="flex gap-6 max-sm:flex-col max-sm:gap-2">
              {userDescription.map((item, index) => (
                <div key={index} className="flex gap-1 items-center">
                  {item.icon}
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>
              <div className="flex max-sm:flex-col max-sm:space-y-2 sm:space-x-4 mt-4 ">
                {userStats.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-2 border border-dashed rounded-md w-full sm:w-1/2"
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
