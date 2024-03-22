// src/types/models.ts

export interface User {
  id: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  testId: number;
  test?: Test;
}

export interface Test {
  id: number;
  title: string;
  description?: string | null;
  duration: number;
  userId: string;
  startAt: Date;
  user?: User;
  questions?: Question[];
}
