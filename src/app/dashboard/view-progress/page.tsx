"use client"
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Title,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { getRecentTestResultsbyTestTaker } from "@/actions/test";

ChartJS.register(BarElement, Title, LinearScale, CategoryScale, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

interface ChartOptions {
  plugins: {
    legend: {
      position: "top";
    };
    title: {
      display: true;
      text: string;
    };
  };
  maintainAspectRatio: boolean;
  responsive: boolean;
}

const BarChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState<ChartOptions>({});

  useEffect(() => {
    const fetchData = async () => {
      const testResults = await getRecentTestResultsbyTestTaker();

      const labels = testResults.map((result) => {
        // Modify this to display a user-friendly label
        const testName = result.test.title;
        return testName;
      });

      const data = testResults.map((result) => {
        const gotScore = Number(result.gotScore);
        const totalScore = Number(result.totalScore);
        if (isNaN(gotScore) || isNaN(totalScore)) {
          console.error("Invalid score format for test result:", result);
          return 0; // Handle invalid score (replace with appropriate logic)
        }
        const percentageScore = (gotScore / totalScore) * 100;
        return percentageScore;
      });

      setChartData({
        labels,
        datasets: [
          {
            label: "Achieved Score",
            data,
            backgroundColor: "#CD4D42",
            hoverBackgroundColor: "#2C73E6",
          },
        ],
      });
    };

    fetchData();
  }, []);
  return (
    <>
    <div className="container mx-auto px-4 py-8"> {/* Container with margins and paddings */}
        <h1 className="text-3xl font-bold mb-4">Your Recent Test Performance</h1> {/* Page heading */}
        <p className="text-base mb-8">
          This page provides a visual representation of your scores across recent tests.
        </p> {/* Subheading */}
      <div className="bh-white m-auto h-[30vh] w-full rounded-lg border p-4 md:col-span-2 lg:h-[60vh]">
        <Bar data={chartData} options={chartOptions} />
      </div>
      </div>
    </>
  );
};

export default BarChart;
