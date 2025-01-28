import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
} from "chart.js";
import "./BillChart.css"; // Import custom CSS

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title
);

const BillChart = ({ bills }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy existing chart instance to avoid canvas reuse errors
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("billChart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: bills.map((bill) => bill.date),
        datasets: [
          {
            label: "Monthly Bills",
            data: bills.map((bill) => bill.amount),
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Monthly Bills Overview",
          },
        },
        scales: {
          x: {
            type: "category",
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Amount",
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Cleanup to avoid canvas reuse issues
      }
    };
  }, [bills]);

  return (
    <div className="bill-chart-container">
      <canvas id="billChart"></canvas>
    </div>
  );
};

export default BillChart;
