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
      <div>
        <div className="flex  space-y-2 mb-2">
          <Skeleton className="h-10 w-24 rounded-md" />
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
  