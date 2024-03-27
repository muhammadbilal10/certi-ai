import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full min-h-[600vh] flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Test List</h1>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no tests
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start test as soon as you purchase a test.
              </p>
              <Button asChild className="mt-4">
                 <Link href="/dashboard/test">Purchase Test</Link>
                </Button>
            </div>
          </div>
        </main>
  );
}
