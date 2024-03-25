import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="px-10">
      <Skeleton className="h-12 w-12 text-xl font-bold mb-4" />
      <div>
        <Card className="flex max-md:flex-col animate-pulse">
          <CardContent className="p-6">
            <Skeleton className="h-40 w-40 rounded-md" />
          </CardContent>
          <CardHeader className="md:px-0">
            <CardTitle>
              <Skeleton className="h-6 w-48 rounded-md" />
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              <div className="flex gap-6 max-sm:flex-col max-sm:gap-2">
                {Array.from({ length: 3 }, (_, index) => (
                  <div key={index} className="flex gap-1 items-center">
                    <Skeleton className="h-5 w-5 rounded-md" />
                    <Skeleton className="h-4 w-24 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex space-x-4 mt-4">
                {Array.from({ length: 2 }, (_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-2 border border-dashed rounded-md w-1/2"
                  >
                    <Skeleton className="h-6 w-20 rounded-md" />
                    <Skeleton className="h-4 w-24 rounded-md mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="animate-pulse">
            <Skeleton className="h-40 w-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
