export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  testId: number;
  
}

export interface Payment {
  id: number;
  userId: string;
  testId: number;
  amount: number;
  status: "pending" | "completed" | "failed"; 
  createdAt: Date;
  // userName: string; 
  instructorName:string;
  testName: string;


}

export interface Test {
  id: number;
  title: string;
  description?: string; // Optional as per your Prisma schema
  duration: number;
  price: number;
  userId: string;
  startAt: Date;
  published: boolean;
  user?: User;
  questions: Question[];
  payment: Payment[];
  purchased?: boolean;
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
