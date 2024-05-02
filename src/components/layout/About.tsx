import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
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
  return (
    <section
      id="about-us"
      className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container min-h-screen"
    >
      <div className="flex-1 flex flex-col gap-6 lg:max-w-lg">
        <h2 className="text-4xl font-semibold font-palanquin capitalize">
          Empower Your Exam Preparation with
          <span className="text-primary"> Certi - Ai </span>
           
        </h2>
        <p className="text-gray-500">
          At <strong>Cert-Ai</strong>, we believe that practice makes perfect.
          We offer a dynamic online environment where students can sharpen their
          skills and prepare for their exams with confidence. Our platform
          allows teachers to create and upload custom tests, which students can
          then purchase and practice at their own pace. Whether you're gearing
          up for midterms, finals, or standardized tests, our comprehensive test
          bank is tailored to meet your needs.
        </p>
        <p className="mt-4 text-gray-500">
          For educators, our platform provides a versatile tool to support your
          teaching goals. Upload tests, track student progress, and offer
          targeted feedback—all from one intuitive interface.
        </p>

        <p className="mt-4  text-gray-500">
          Join us today and transform how you prepare for your exams—because
          when you practice with purpose, you succeed with confidence.
        </p>
        <div className="mb-4">
          <Button>Join us Now</Button>
        </div>
      </div>
      <div>
        <Image
          src="https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="quality"
          height={522}
          width={570}
          className="object-contain rounded-xl"
        />
      </div>
    </section>
  );
}
