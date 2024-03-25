import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <Card className="w-full animate-pulse">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-48 rounded-md" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-36 rounded-md" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8 w-full">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-24 rounded-md" />
      </CardFooter>
    </Card>
  );
}
