import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  DownloadCloud,
  File,
  Menu,
  Package2,
  Search,
  User2,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { currentUser } from "@clerk/nextjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardStatCard from "../common/DashboardStatCard";
import { text } from "stream/consumers";
import { getAllTests, getPublishedTests, getSpecificTest, getTestsByUserId, getTotalEarningsByInstructor, getTotalSpentByStudent, getTotalTestsPurchasedByStudent, getRecentlyPurchasedTestsByStudent } from "@/actions/test";
import { getRole } from "@/actions/user";
import { getLastFivePaymentsByUserId, getTotalPayments } from "@/actions/payment";
import { getAllInstructors } from "@/actions/instructor";



export default async function DashboardPage() {
  const user = await currentUser();

  console.log(user?.id);

  const role = await getRole();
  const teacherEarning = await getTotalEarningsByInstructor(user?.id as string);
  const studentSpent = await getTotalSpentByStudent(user?.id as string);
  const lastFivePayments = await getLastFivePaymentsByUserId(user?.id as string);
  const totalPayments = await getTotalPayments();
  const totalTestByInstructor = await getTestsByUserId(user?.id as string);
  const totalTestByTestTaker = await getPublishedTests(user?.id as string);
  const totalTestPurchasedByStudent = await getTotalTestsPurchasedByStudent(user?.id as string);
  const totaltest = await getAllTests();
  console.log("totalTestByInstructor", totalTestByInstructor);
  console.log("totalTestByTestTaker", totalTestByTestTaker);
  const totalInstructor = await getAllInstructors().then((data) => data?.length);
  console.log("totalInstructor", totalInstructor);
  console.log("teacherEarning", teacherEarning);
  console.log("studentEarning", studentSpent);
  console.log("lastFivePayments", lastFivePayments);
  console.log("totalPayments", totalPayments);
  const recentPurchasedTestbyStudentData = await getRecentlyPurchasedTestsByStudent(user?.id as string);
  console.log("recentPurchasedTestbyStudentData", recentPurchasedTestbyStudentData);
  // let cardItem = [
  //   {
  //     text: "Total Revenue",
  //     amount: "$45,231.89",
  //     percentage: "+20.1% from last month",
  //     icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
  //   },
  //   {
  //     text: "Subscriptions",
  //     amount: "+2350",
  //     percentage: "+180.1% from last month",
  //     icon: <Users className="h-4 w-4 text-muted-foreground" />,
  //   },
  //   {
  //     text: "Sales",
  //     amount: "+12,234",
  //     percentage: "+19% from last month",
  //     icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
  //   },
  //   {
  //     text: "Active Now",
  //     amount: "+573",
  //     percentage: "+201 since last hour",
  //     icon: <Activity className="h-4 w-4 text-muted-foreground" />,
  //   },
  // ];
  let cardItem = [] as any;
  if (role === 'student') {
    cardItem = [
      {
        text: "Total Spent",
        amount: "$" + studentSpent,
        percentage: "from last month",
        icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      },
      {
        text: "Total Tests",
        amount: totaltest?.length,
        percentage: "from last month",
        icon: <File className="h-4 w-4 text-muted-foreground" />,
      },
      {
        text: "Purchased Test",
        amount: "+" + totalTestPurchasedByStudent,
        percentage: "since last hour",
        icon: <File className="h-4 w-4 text-muted-foreground" />,
      },
    ];
  } else if (role === 'instructor') {
    cardItem = [
      {
        text: "Total Earnings",
        amount: "$" + teacherEarning,
        percentage: "from last month",
        icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      },
      {
        text: "Total Tests",
        amount: totalTestByInstructor?.length,
        percentage: "from last month",
        icon: <File className="h-4 w-4 text-muted-foreground" />,
      },

      {
        text: "Active Test",
        amount: "+" + totalTestByInstructor?.length,
        percentage: "since last hour",
        icon: <Activity className="h-4 w-4 text-muted-foreground" />,
      },
    ];
  } else {
    cardItem = [
      {
        text: "Total Revenue",
        amount: "$" + totalPayments,
        percentage: " from last month",
        icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      },
      {
        text: "Total Tests",
        amount: totaltest?.length,
        percentage: "from last month",
        icon: <File className="h-4 w-4 text-muted-foreground" />,
      },
      {
        text: "Total Instructor",
        amount: totalInstructor,
        percentage: "since last hour",
        icon: < User2 className="h-4 w-4 text-muted-foreground" />,
      },
      {
        text: "Total Test Takers",
        amount: totalTestByTestTaker?.length,
        percentage: "since last hour",
        icon: <Users className="h-4 w-4 text-muted-foreground" />,
      }
    ];
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-8 ">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {/* {cardItem.map((item, index) => (
            <div key={index}>
              <DashboardStatCard
                key={index}
                text={item.text}
                amount={item.amount}
                percentage={item.percentage}
                icon={item.icon}
              />
            </div>
          ))} */}
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Recent Attempted test </CardTitle>
                <CardDescription>
                  Recent Mock Test from your Environment.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Type
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Status
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Olivia Smith</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        olivia@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Refund
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Declined
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-24
                    </TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Noah Williams</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        noah@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Subscription
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-25
                    </TableCell>
                    <TableCell className="text-right">$350.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Emma Brown</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        emma@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-26
                    </TableCell>
                    <TableCell className="text-right">$450.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-27
                    </TableCell>
                    <TableCell className="text-right">$550.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Purchased Test</CardTitle>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/dashboard/test-environment">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="grid gap-8">
              {recentPurchasedTestbyStudentData?.map((purchase, index) => (
                <div key={purchase.id} className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={`/avatars/0${index + 1}.png`} alt="Avatar" />
                    <AvatarFallback>{purchase.test.title.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {purchase.test.title}
                    </p>
                    <p className="text-sm text-muted-foreground" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {purchase.test.description}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+${purchase.test.price.toFixed(2)}</div>
                </div>
              ))}
            </CardContent>
          </Card>
          {/* <Card>
            <CardHeader>
              <CardTitle>Recent Purchased</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    olivia.martin@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Jackson Lee
                  </p>
                  <p className="text-sm text-muted-foreground">
                    jackson.lee@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/03.png" alt="Avatar" />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Isabella Nguyen
                  </p>
                  <p className="text-sm text-muted-foreground">
                    isabella.nguyen@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$299.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/04.png" alt="Avatar" />
                  <AvatarFallback>WK</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    William Kim
                  </p>
                  <p className="text-sm text-muted-foreground">
                    will@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$99.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/05.png" alt="Avatar" />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>
                  <p className="text-sm text-muted-foreground">
                    sofia.davis@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </main>
    </div>
  );
}
