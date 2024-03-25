"use client";

import { Text, Card, Box } from "@chakra-ui/react";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, PointElement, LineElement, BarElement } from "chart.js";
import { Line } from "react-chartjs-2";
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, BarElement);

export default function MainChart() {
    const labels = 7;
    const data = {
        labels: labels,
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };

  return (
    <>
    <Text>Hello From Chart.tsx</Text>
      {/* <div>
        <Line
          data={{
            labels: ["2023-01", "2023-02", "2023-03", "2023-04", "2023-05", "2023-06", "2023-07"],
            datasets: [
              {
                data: [100, 120, 115, 134, 168, 132, 200],
                backgroundColor: "purple",
              },
            ],
          }}
        />
      </div> */}
      <Bar
        data = {{
            labels: ["2023-01", "2023-02", "2023-03", "2023-04", "2023-05", "2023-06", "2023-07"],
            datasets: [
              {
                label: "req",
                data: [100, 120, 115, 134, 168, 132, 200],
                backgroundColor:'rgba(153, 102, 255, 0.2)',
                borderColor:'rgb(153, 102, 255)',
                borderWidth: 1
              },
              {
                label: "res",
                data: [10, 20, 105, 124, 160, 122, 120],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor:'rgb(54, 162, 235)',
                borderWidth: 1
              }
            ],
        }}
      />
    </>
  );
}
