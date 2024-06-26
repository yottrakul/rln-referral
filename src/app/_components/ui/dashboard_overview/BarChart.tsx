"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

//Prop of Chart
const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

//Data for Chart
const data = {
  labels,
  datasets: [
    {
      label: "This Month",
      data: [12, 16, 22, 9, 11, 21, 7],
      backgroundColor: "#04BFDA",
      borderRadius: 25,
    },

    {
      label: "Last Month",
      data: [17, 10, 15, 13, 14, 19, 9],
      backgroundColor: "#6C13B7",
      borderRadius: 25,
    },
  ],
};


export default function BarChart() {
  return <Bar options={options} data={data} />;
}
