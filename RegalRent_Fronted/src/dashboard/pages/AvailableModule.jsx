// src/pages/AvailableModule.jsx
import React from "react";

const stockData = [
  {
    id: 1,
    title: "Available Stock",
    count: 120,
    description: "Items currently available in inventory",
    color: "#4ade80", // green
  },
  {
    id: 2,
    title: "Low Stock",
    count: 25,
    description: "Items running low in stock",
    color: "#facc15", // yellow
  },
  {
    id: 3,
    title: "Out of Stock",
    count: 10,
    description: "Items currently unavailable",
    color: "#f87171", // red
  },
  {
    id: 4,
    title: "Reserved Item",
    count: 40,
    description: "Items reserved by customers",
    color: "#60a5fa", // blue
  },
  {
    id: 5,
    title: "Damaged Item",
    count: 5,
    description: "Items damaged or unusable",
    color: "#a78bfa", // purple
  },
];

const AvailableModule = () => {
  return (
    <div className="page">
      <h1>Available Modules</h1>
      <p>Stock status of all items in the system</p>
      <div className="cards-container">
        {stockData.map((item) => (
          <div
            key={item.id}
            className="stock-card"
            style={{ borderTop: `5px solid ${item.color}` }}
          >
            <h2>{item.count}</h2>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableModule;
