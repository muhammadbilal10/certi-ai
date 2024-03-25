import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <Card className="flex max-md:flex-col">
      <CardContent className="p-6">
        <Skeleton className="h-40 w-40 rounded-md" />
      </CardContent>
      <CardHeader className="md:px-0">
        <CardTitle>
          <Skeleton className="h-6 w-3/4 rounded-md" />
        </CardTitle>
        <div className="text-sm">
          <Skeleton className="h-4 w-full rounded-md mb-2" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
        </div>
        <div className="flex space-x-4 mt-4">
          <Skeleton className="h-20 w-1/2 rounded-md" />
          <Skeleton className="h-20 w-1/2 rounded-md" />
        </div>
      </CardHeader>
    </Card>
  );
}
