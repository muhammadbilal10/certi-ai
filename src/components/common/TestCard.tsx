import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

export default function TestCard({
  name,
  instructor,
  time,
  date,
}: {
  name: string;
  instructor: string;
  time: string;
  date: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {instructor}
          <div className="flex space-x-6 mt-2">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {time}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      {/* <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}
