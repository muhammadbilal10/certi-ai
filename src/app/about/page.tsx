
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Topnav from "@/components/layout/Topnav";
import Sidebar from "@/components/layout/Sidebar";
import { currentUser } from "@clerk/nextjs";
import { getRole } from "@/actions/user";
export default async function About() {
    const features = [
        "Customizable mock tests",
        "Instant grading and feedback",
        "Progress tracking and analytics",
        "Wide variety of subjects",
        "User-friendly interface",
        "Affordable pricing",
        "Expert support",
        "Community forums for discussion",
    ];
    const user = await currentUser();
    const role = (await getRole()) as string;
    return (
       <>
      
      <Sidebar role={role} userId={user?.id as string} />
       <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
            <div className="max-w-2xl px-6 py-10 mx-auto">
                <h1 className="text-4xl sm:text-6xl font-bold text-center text-primary">
                    About Our Mock Test Portal
                </h1>
                <p className="mt-6 text-foreground text-center">
                    Our platform provides a unique opportunity for students to practice and prepare for their exams. Teachers can upload tests which students can purchase and practice at their own pace.
                </p>
                <p className="mt-6 text-foreground text-center">
                    We believe in the power of practice and the difference it can make in a student's preparation. Our goal is to provide a platform that allows students to test their knowledge and improve their performance.
                </p>
                <div className="mt-10 text-center">
                    <Link href="/">
                        <Button className="inline-block px-6 py-2 text-xs font-medium text-center text-primary-foreground uppercase transition-colors duration-200 transform bg-primary rounded-md hover:bg-primary focus:outline-none focus:bg-primary">
                            Get Started
                        </Button>
                    </Link>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight transition-colors text-center text-primary mt-10">
                    Features of Our Portal
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    {features.map((feature, index) => (
                        <div key={index} className="p-4 text-primary bg-gradient-to-r from-accent  rounded-md">
                            {feature}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}