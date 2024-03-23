export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  testId: number;
  // Assuming you don't need a direct reference to the Test object from a Question in your component
}

export interface Payment {
  id: number;
  userId: string;
  testId: number;
  amount: number;
  status: "pending" | "completed" | "failed"; // Use a union type for known values
  createdAt: Date;
  // Here as well, assuming direct references to User and Test objects are not needed in your component
}

export interface Test {
  id: number;
  title: string;
  description?: string; // Optional as per your Prisma schema
  duration: number;
  userId: string;
  startAt: Date;
  published: boolean;
  user?: User; // Assuming you might sometimes include user details
  questions: Question[];
  payment: Payment[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  mobile?: string;
  joinedAt: Date;
  profileImage?: string;
  location?: string;
  // Assuming direct references to Test and Payment objects are not needed
  // If they are, you would include them similarly to how they're included in Test
}
