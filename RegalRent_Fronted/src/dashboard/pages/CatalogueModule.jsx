// src/pages/CatalogueModule.jsx
import React from "react";


const catalogueData = [
  {
    id: 1,
    title: "Product Catalogue",
    description: "View and manage all products available in the system",
    color: "#4ade80", // green
  },
  {
    id: 2,
    title: "Category Product",
    description: "Organize products by category and manage them",
    color: "#60a5fa", // blue
  },
  {
    id: 3,
    title: "Product Detail",
    description: "View detailed information about each product",
    color: "#fbbf24", // yellow
  },
];

const CatalogueModule = () => {
  return (
    <div className="page">
      <h1>Catalogue Modules</h1>
      <p>Manage products, services, and categories</p>

      <div className="cards-container">
        {catalogueData.map((item) => (
          <div
            key={item.id}
            className="catalogue-card"
            style={{ borderTop: `5px solid ${item.color}` }}
          >
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <button className="manage-btn">Manage</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogueModule;
