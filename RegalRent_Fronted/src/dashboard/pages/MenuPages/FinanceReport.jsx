

import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "../MenuPages/financereport.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinanceReport = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = () => {
    axios
      .get("http://localhost:5000/api/finance/report")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("Error fetching report:", err));
  };

  if (!data) return <p className="loading-text">Loading...</p>;

  const chartData = {
  labels: ["Rental Income", "Advance", "Deposit", "Refund", "Due"],
  datasets: [
    {
      label: "Amount (₹)",
      data: [
        parseFloat(data.total_rental_income),
        parseFloat(data.total_advance_amount),
        parseFloat(data.total_deposit_amount),
        parseFloat(data.total_refund_amount),
        parseFloat(data.total_due_amount),
      ],
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return;

        const gradients = [];

        const colors = [
          ["#22c55e", "#15803d"], // income
          ["#3b82f6", "#1d4ed8"], // advance
          ["#facc15", "#ca8a04"], // deposit
          ["#ef4444", "#b91c1c"], // refund
          ["#f87171", "#991b1b"], // due
        ];

        colors.forEach((colorPair) => {
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, colorPair[0]);
          gradient.addColorStop(1, colorPair[1]);
          gradients.push(gradient);
        });

        return gradients;
      },
      borderRadius: {
        topLeft: 14,
        topRight: 14,
        bottomLeft: 0,
        bottomRight: 0,
      },
      borderSkipped: false,
      barThickness: 42,
      maxBarThickness: 50,
      categoryPercentage: 0.6,
      barPercentage: 0.8,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1400,
    easing: "easeOutCubic",
  },
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: "Finance Overview",
      font: { size: 20, weight: "600" },
      color: "#0f172a",
      padding: { bottom: 25 },
    },
    tooltip: {
      backgroundColor: "#0f172a",
      titleColor: "#ffffff",
      bodyColor: "#e2e8f0",
      padding: 14,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        label: function (context) {
          return "₹ " + context.raw.toLocaleString("en-IN");
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#334155",
        font: { size: 13, weight: "500" },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(100,116,139,0.15)",
        drawBorder: false,
      },
      ticks: {
        color: "#475569",
        padding: 8,
        callback: function (value) {
          return "₹ " + value.toLocaleString("en-IN");
        },
      },
    },
  },
};

  return (
    <div className="finance-container">
      <h2 className="finance-heading">Finance Report</h2>

      <div className="finance-kpi">
        <div className="finance-card">
          <h4>Total Orders</h4>
          <p>{data.total_orders || 0}</p>
        </div>
        <div className="finance-card">
          <h4>Total Rental Income</h4>
          <p className="green">₹ {data.total_rental_income || 0}</p>
        </div>
        <div className="finance-card">
          <h4>Total Advance Amount</h4>
          <p>₹ {data.total_advance_amount || 0}</p>
        </div>
        <div className="finance-card">
          <h4>Total Deposit Amount</h4>
          <p>₹ {data.total_deposit_amount || 0}</p>
        </div>
        <div className="finance-card">
          <h4>Total Refund Amount</h4>
          <p className="red">₹ {data.total_refund_amount || 0}</p>
        </div>
        <div className="finance-card">
          <h4>Total Due Amount</h4>
          <p className="red">₹ {data.total_due_amount || 0}</p>
        </div>
      </div>

      <div className="finance-chart">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default FinanceReport;