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
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState<ChartOptions>({});

  useEffect(() => {
    setChartData({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Sales $",
          data: [8514, 11255, 9885, 15554, 28551, 26318, 21579],
          borderColor: "#F1F5F9",
          backgroundColor: "#3482F6",
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Daily Revenue",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <>
      <div className="bh-white m-auto h-[50vh] w-full rounded-lg border p-4 md:col-span-2 lg:h-[70vh]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default BarChart;
