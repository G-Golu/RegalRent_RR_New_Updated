import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function Dashboard() {
  const stats = {
    revenue: 94600,
    activeOrders: 32,
    products: 128,
    users: 56,
  };

  const pieData = [
    { name: "Rented", value: 54, color: "#3b82f6" },
    { name: "Available", value: 26, color: "#22c55e" },
    { name: "Cancelled", value: 20, color: "#ef4444" },
  ];

  const earningData = [
    { month: "May", value: 150000 },
    { month: "Jun", value: 220000 },
    { month: "Jul", value: 180000 },
    { month: "Aug", value: 250000 },
    { month: "Sep", value: 210000 },
    { month: "Oct", value: 300000 },
  ];

  return (
    <div className="dashboard">
      {/* TOP STATS */}
      <div className="stats">
        <div className="stat-card">
          <p>Total Revenue</p>
          <h2>₹{stats.revenue}</h2>
        </div>
        <div className="stat-card">
          <p>Active Orders</p>
          <h2>{stats.activeOrders}</h2>
        </div>
        <div className="stat-card">
          <p>Total Products</p>
          <h2>{stats.products}</h2>
        </div>
        <div className="stat-card">
          <p>Total Users</p>
          <h2>{stats.users}</h2>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid">
        <div className="card">
          <h3>Product Status</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={55}
                outerRadius={80}
              >
                {pieData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={earningData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="card">
        <h3>Recent Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Cloth</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#RR1021</td>
              <td>Aman</td>
              <td>Designer Sherwani</td>
              <td className="green">Delivered</td>
              <td>₹2500</td>
            </tr>
            <tr>
              <td>#RR1022</td>
              <td>Neha</td>
              <td>Lehenga</td>
              <td className="orange">Pending</td>
              <td>₹1800</td>
            </tr>
            <tr>
              <td>#RR1023</td>
              <td>Rohit</td>
              <td>Blazer</td>
              <td className="blue">Rented</td>
              <td>₹1200</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* STYLES */}
      <style>{`
        .dashboard {
          padding: 10px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .stat-card p {
          color: #64748b;
          margin-bottom: 5px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-bottom: 30px;
        }

        .card {
          background: white;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }

        th, td {
          padding: 12px;
          border-bottom: 1px solid #eee;
          text-align: left;
        }

        .green { color: #16a34a; font-weight: 600; }
        .orange { color: #ea580c; font-weight: 600; }
        .blue { color: #2563eb; font-weight: 600; }

        @media(max-width: 900px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
