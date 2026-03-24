import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./GeneralReport.css";

const dummyData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 26000 },
  { month: "Jun", revenue: 30000 },
];

const transactions = [
  { id: "#ORD1021", user: "Rahul Sharma", amount: 2500, status: "Completed" },
  { id: "#ORD1022", user: "Anjali Verma", amount: 1800, status: "pending" },
  { id: "#ORD1023", user: "Vikram Singh", amount: 3200, status: "Failed" },
];

const GeneralReport = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const totalRevenue = dummyData.reduce(
    (acc, item) => acc + item.revenue,
    0
  );

  const handleGenerateReport = () => {
    if (!fromDate || !toDate) {
      alert("Please select From Date and To Date");
      return;
    }

    const reportData = dummyData.map((item) => ({
      Month: item.month,
      Revenue: item.revenue,
      From: fromDate,
      To: toDate,
    }));

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(data, `General_Report_${fromDate}_to_${toDate}.xlsx`);
  };

  return (
    <div className="report-container">
      <h1 className="report-heading">General System Report</h1>

      {/* Filter */}
      <div className="filter-section">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <button onClick={handleGenerateReport}>
          Generate Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="kpi-section">
        <div className="kpi-card">
          <h4>Total Revenue</h4>
          <p>₹ {totalRevenue}</p>
        </div>
        <div className="kpi-card">
          <h4>Total Orders</h4>
          <p>320</p>
        </div>
        <div className="kpi-card">
          <h4>Total Users</h4>
          <p>540</p>
        </div>
        <div className="kpi-card">
          <h4>Total Products</h4>
          <p>85</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="chart-section">
        <h3>Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dummyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#4f46e5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Recent Transactions Table */}
      <div className="table-section">
        <h3>Recent Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.user}</td>
                <td>₹ {item.amount}</td>
                <td
                  className={`status ${
                    item.status === "Completed"
                      ? "pending"
                      : item.status === "pending"
                      ? "pending"
                      : "failed"
                  }`}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralReport;