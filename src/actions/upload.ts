"use server";
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { Prisma } from '@prisma/client';
import { writeFile } from 'fs/promises';
import fs from 'fs';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { auth } from "@clerk/nextjs";
import * as XLSX from 'xlsx';

interface MulterRequest extends NextApiRequest {
  file: Express.Multer.File;
}

const upload = multer({ dest: '/tmp' }); // Temporary storage location

export default async function testhandler(formData: FormData,) {
  console.log("Form Data", formData.get("testname"));
  console.log("Form Data", formData.get("file"));
  const { userId } = auth(); // Clerk user ID
  try {
    const file = formData.get("file") as File;
    const testName = formData.get("testname");
    const teacherId = userId;
    
    if (!file) throw new Error('No file uploaded');

   
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join(process.cwd(), file.name);
    await writeFile(path, buffer);

    //console.log(`open ${path} to see the uploaded file`);
// Convert the uploaded file to a buffer


// Read the Excel file from the buffer
const workbook = XLSX.read(buffer, { type: "buffer" });

// Assuming the first sheet is the one we're interested in
const sheetName = workbook.SheetNames[0];
//console.log(sheetName);
const worksheet = workbook.Sheets[sheetName];
//console.log(worksheet);

// Convert sheet to JSON
const results = XLSX.utils.sheet_to_json(worksheet);
console.log(results);


    const test = await prisma.test.create({
      data: {
        name: testName as string,
        duration: '60',
        explanation: 'This is a test',
        teacherId: teacherId as string,
      },
    });

    for (let i = 0; i < results.length; i++) {
      const questionData: {
        Questions: string;
        'Option 1': string;
        'Option 2': string;
        'Option 3': string;
        'Option 4': string;
        Answer: string;
      } = results[i] as {
        Questions: string;
        'Option 1': string;
        'Option 2': string;
        'Option 3': string;
        'Option 4': string;
        Answer: string;
      };
      
      await prisma.question.create({
        data: {
          question: questionData.Questions,
          options: [
            questionData['Option 1'] ? questionData['Option 1'].toString() : "",
            questionData['Option 2'] ? questionData['Option 2'].toString() : "",
            questionData['Option 3'] ? questionData['Option 3'].toString() : "",
            questionData['Option 4'] ? questionData['Option 4'].toString() : "",
          ],
          answer: questionData.Answer ? questionData.Answer.toString() : "",
          testId: test.id,
        },
      });
    }
  }
  catch (e) {
    console.log("Error", e);
  }
}