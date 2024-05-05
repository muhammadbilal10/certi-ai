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
import { text } from "stream/consumers";
import { getAllTests, getPublishedTests, getSpecificTest, getTestsByUserId, getTotalEarningsByInstructor, getTotalSpentByStudent, getTotalTestsPurchasedByStudent, getRecentlyPurchasedTestsByStudent, getRecentPurchasedTests } from "@/actions/test";
import { getRecentUsers, getRole, getTotalStudents } from "@/actions/user";
import { getLastFivePaymentsByUserId, getTotalPayments } from "@/actions/payment";
import { getAllInstructors } from "@/actions/instructor";
import DashboardStatCard from "@/components/common/DashboardStatCard";
import { ReactElement } from "react";

type CardItem = {
  text: string;
  amount: string | number;
  percentage: string;
  icon: ReactElement;
}


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
  const totalStudent = await getTotalStudents();
  console.log("totalInstructor", totalInstructor);
  console.log("teacherEarning", teacherEarning);
  console.log("studentEarning", studentSpent);
  console.log("lastFivePayments", lastFivePayments);
  console.log("totalPayments", totalPayments);
  const recentPurchasedTestbyStudentData = await getRecentlyPurchasedTestsByStudent(user?.id as string);
  console.log("recentPurchasedTestbyStudentData", recentPurchasedTestbyStudentData);
  //admin page dashboard details:
  const recentappUsers = await getRecentUsers();
  console.log("recentappUsers", recentappUsers);
  const recentPurchasedTest = await getRecentPurchasedTests();
  console.log("recentPurchasedTest", recentPurchasedTest);
  let cardItem = [] as CardItem[];
  if (role === 'student') {
    cardItem = [
      {
        text: "Total Spent",
        amount: "$" + studentSpent,
        percentage: "",
        icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      },
      {
        text: "Total Tests",
        amount: totaltest?.length.toString() as string,
        percentage: "",
        icon: <File className="h-4 w-4 text-muted-foreground" />,
      },
      {
        text: "Purchased Test",
        amount: "" + totalTestPurchasedByStudent,
        percentage: "",
        icon: <File className="h-4 w-4 text-muted-foreground" />,
      },
    ];
  } else if (role === 'instructor') {
    cardItem = [
      {
        text: "Total Earnings",
        amount: "$" + teacherEarning,
        percentage: "",
        icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      },
      {
        text: "Total Tests",
        amount: totalTestByInstructor?.length,
        percentage: "",
        icon: <File className="h-4 w-4 text-muted-foreground" />,
      },

      {
        text: "Active Test",
        amount: "" + totalTestByInstructor?.length,
        percentage: "",
        icon: <Activity className="h-4 w-4 text-muted-foreground" />,
      },
    ];
  } else {
    cardItem = [
      // {
      //   text: "Total Revenue",
      //   amount: "$" + totalPayments,
      //   percentage: " from last month",
      //   icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      // },
      {
        text: "Total Tests",
        amount: totaltest?.length.toString() as string,
        percentage: "",
        icon: <File className="h-4 w-4 text-muted-foreground" />,
      },
      {
        text: "Total Instructor",
        amount: totalInstructor?.toString() as string,
        percentage: "",
        icon: < User2 className="h-4 w-4 text-muted-foreground" />,
      },
      {
        text: "Total Test Takers",
        amount: totalStudent as number,
        percentage: "",
        icon: <Users className="h-4 w-4 text-muted-foreground" />,
      }
    ];
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-8 ">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {cardItem.map((item, index) => (
            <div key={index}>
              <DashboardStatCard
                key={index}
                text={item.text}
                amount={item.amount as string}
                percentage={item.percentage}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              {role === "admin" && <> <div className="grid gap-2">

                <CardTitle>Recent Purchases</CardTitle>
                <CardDescription>Overview of recently purchased tests.</CardDescription>
              </div>

                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="/dashboard/payments">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </>
              }
              {role === "student" && <> <div className="grid gap-2">

                <CardTitle>Recent Test Activities</CardTitle>
                <CardDescription>Overview of recent activities related to tests.</CardDescription>
              </div>

                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="/dashboard/payments">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </>
              }
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test</TableHead>
                    <TableHead >
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPurchasedTest?.map((purchase, index) => (
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">{purchase.test.title}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {purchase?.user?.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        {purchase?.createdAt.toDateString()}
                      </TableCell>
                      <TableCell className="text-right">${purchase.amount}</TableCell>
                    </TableRow>
                  ))}

                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent  {role === "student" ? "Purchased Test" : role === "instructor" ? "Added Test" : "Users"}</CardTitle>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href={role === "student" ? "/dashboard/test-environment" : role === "instructor" ? "Added Test" : "/dashboard/instructors"}>
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="grid gap-8">
              {role === "student" && recentPurchasedTestbyStudentData?.map((purchase, index) => (
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
                  <div className="ml-auto font-medium">${purchase.test.price}</div>
                </div>
              ))}
              {role === "admin" && recentappUsers?.map((recentUsers, index) => (
                <div key={recentUsers.id} className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={recentUsers?.profileImage || ""} alt="Avatar" />
                    <AvatarFallback>{recentUsers?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {recentUsers?.name}
                    </p>
                    <p className="text-sm text-muted-foreground" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {recentUsers.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">{recentUsers.role}</div>
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


// import StatCard from "@/components/common/StatCard";
// import { FilePen, HandCoins, PersonStandingIcon } from "lucide-react";
// import { auth, currentUser } from "@clerk/nextjs";
// import { getAllTestTakers } from "@/actions/test-taker";
// import { getAllInstructors } from "@/actions/instructor";
// import { PaymentGraphCard } from "@/components/common/PaymentGraphCard";
// import { DashboardPage } from "@/components/layout/DashboardPage";
// import Footer from "@/components/layout/Footer";

// async function getTestTakers() {
//   const data = await getAllTestTakers();
//   console.log(data);
//   return data;
// }

// async function getInstuctors() {
//   const data = await getAllInstructors();
//   console.log(data);
//   return data;
// }
// export default async function Dashboardpage() {
//   const testTakers = await getTestTakers();
//   const instructors = await getInstuctors();

//   const { userId } = auth();
//   console.log("clerk: ", userId);
//   const stats = [
//     {
//       title: "Total Instructor",
//       count: instructors?.length,
//       icon: (
//         <PersonStandingIcon
//           size={48}
//           className=" text-[#757fef]"
//           strokeWidth={1}
//         />
//       ),
//     },
//     {
//       title: "Total Test Takers",
//       count: testTakers?.length,
//       icon: <FilePen size={48} className=" text-[#757fef]" strokeWidth={1} />,
//     },
//     {
//       title: "Total Payment",
//       count: "$ 1000",
//       icon: <HandCoins size={48} className=" text-[#757fef]" strokeWidth={1} />,
//     },
//   ];
//   return (
//     <div className="min-h-screen">
//       {/* <PaymentGraphCard /> */}

//       {/* <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {stats.map((stat, index) => (
//           <StatCard
//             key={index}
//             title={stat.title}
//             value={stat.count || 0}
//             icon={stat.icon}
//           />
//         ))}
//       </div> */}
//       <DashboardPage />
//     </div>
//   );
// }
