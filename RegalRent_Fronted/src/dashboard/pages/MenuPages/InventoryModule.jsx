


// import React, { useEffect, useState, useMemo } from "react";
// import "./InventoryModule.css";

// const InventoryModule = () => {

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("All");
//   const [statusFilter, setStatusFilter] = useState("All");


//   // ================= FETCH INVENTORY =================
//   useEffect(() => {

//     fetch("http://localhost:5000/api/inventory/report")
//       .then((res) => res.json())
//       .then((data) => {

//         if (Array.isArray(data)) {

//           const cleanData = data.map((p) => ({
//             ...p,
//             stock: Number(p.stock) || 0,
//            min_stock: Number(p.min_stock) || 5,
//             mrp: Number(p.mrp) || 0,
//             rent_price: Number(p.rent_price) || 0,
//             deposit_price: Number(p.deposit_price) || 0,
//             times_rented: Number(p.times_rented) || 0
//           }));

//           setProducts(cleanData);

//         } else {
//           setProducts([]);
//         }

//       })
//       .catch((err) => {
//         console.error("Inventory fetch error:", err);
//         setProducts([]);
//       })
//       .finally(() => setLoading(false));

//   }, []);


//   // ================= STOCK STATUS =================
// const getStockStatus = (stock, minStock) => {
//   if (stock === 0) return "Out of Stock";
//   if (stock <= minStock) return "Low Stock";
//   return "Healthy Stock";
// };

//   // ================= FILTER PRODUCTS =================
//   const filteredProducts = useMemo(() => {

//     return products.filter((p) => {

//       const matchesSearch =
//         (p.product_name || "")
//           .toLowerCase()
//           .includes(search.toLowerCase());

//       const matchesCategory =
//         categoryFilter === "All" ||
//         p.category_name === categoryFilter;

//      const matchesStatus =
//   statusFilter === "All" ||
//   getStockStatus(p.stock, p.min_stock) === statusFilter;

//       return matchesSearch && matchesCategory && matchesStatus;

//     });

//   }, [products, search, categoryFilter, statusFilter]);


//   // ================= KPI CALCULATIONS =================
//   const totalProducts = products.length;

//   const totalInventoryValue = products.reduce(
//     (sum, p) => sum + (p.stock * p.mrp),
//     0
//   );


// const lowStock = products.filter(
//   (p) => p.stock > 0 && p.stock <= p.min_stock
// ).length;

// const outOfStock = products.filter(
//   (p) => p.stock === 0
// ).length;

// const healthyStock = products.filter(
//   (p) => p.stock > p.min_stock
// ).length;
//   const categories =
//     [...new Set(products.map((p) => p.category_name))].length;


//   if (loading) {
//     return <div className="inventory-container">Loading inventory...</div>;
//   }


//   return (

//     <div className="inventory-container">

//       {/* ================= SUMMARY CARDS ================= */}

//       <div className="summary-grid">

//         <div className="summary-card">
//           <h4>Total Products</h4>
//           <p>{totalProducts}</p>
//         </div>

//         <div className="summary-card">
//           <h4>Inventory Value</h4>
//           <p>₹ {totalInventoryValue.toLocaleString("en-IN")}</p>
//         </div>

//         <div className="summary-card success">
//           <h4>Healthy Stock</h4>
//           <p>{healthyStock}</p>
//         </div>

//         <div className="summary-card warning">
//           <h4>Low Stock</h4>
//           <p>{lowStock}</p>
//         </div>

//         <div className="summary-card danger">
//           <h4>Out of Stock</h4>
//           <p>{outOfStock}</p>
//         </div>

//         <div className="summary-card">
//           <h4>Categories</h4>
//           <p>{categories}</p>
//         </div>

//       </div>



//       {/* ================= FILTERS ================= */}

//       <div className="inventory-controls">

//         <input
//           type="text"
//           placeholder="Search product..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//         >
//           <option value="All">All Categories</option>

//           {[...new Set(products.map((p) => p.category_name))]
//             .filter(Boolean)
//             .map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//         </select>

//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//         >
//           <option value="All">All Status</option>
//           <option value="Healthy Stock">Healthy Stock</option>
//           <option value="Low Stock">Low Stock</option>
//           <option value="Out of Stock">Out of Stock</option>
//         </select>

//       </div>



//       {/* ================= TABLE ================= */}

//       <div className="table-wrapper">

//         <table className="inventory-table">

//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Product Code</th>
//               <th>Category</th>
//               <th>Sub Category</th>
//               <th>Size</th>
//               <th>Color</th>
//               <th>Stock</th>
//               <th>Min Level</th>
//               <th>Status</th>
//               <th>Cost Price</th>
//               <th>Rental Price</th>
//               <th>Deposit</th>
//               <th>Times Rented</th>
//               <th>Last Rented</th>
//               <th>Stock Value</th>
//             </tr>
//           </thead>

//           <tbody>

//             {filteredProducts.map((p) => (

//               <tr key={p.product_id}>

//                 <td>{p.product_name}</td>
//                 <td>{p.code}</td>
//                 <td>{p.category_name}</td>
//                 <td>{p.subcategory_id}</td>
//                 <td>{p.size}</td>
//                 <td>{p.color}</td>

//                 <td>{p.stock}</td>
//                 <td>{p.min_stock}</td>

//                 <td>

//             <span
//   className={`badge ${
//     getStockStatus(p.stock, p.min_stock) === "Healthy Stock"
//       ? "success"
//       : getStockStatus(p.stock, p.min_stock) === "Low Stock"
//       ? "warning"
//       : "danger"
//   }`}
// >
//   {getStockStatus(p.stock, p.min_stock)}
// </span>

//                 </td>

//                 <td>₹ {p.mrp}</td>
//                 <td>₹ {p.rent_price}</td>
//                 <td>₹ {p.deposit_price}</td>

//                 <td>{p.times_rented}</td>

//                 <td>
//                   {p.last_rented
//                     ? new Date(p.last_rented).toLocaleString("en-IN")
//                     : "-"}
//                 </td>

//                 <td>
//                   ₹ {(p.stock * p.mrp).toLocaleString("en-IN")}
//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>

//   );

// };

// export default InventoryModule;




























import React, { useEffect, useState, useMemo } from "react";
import "./InventoryModule.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const InventoryModule = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // ================= FETCH INVENTORY =================
  useEffect(() => {

    fetch("http://localhost:5000/api/inventory/report")
    
      .then((res) => res.json())
      .then((data) => {

        if (Array.isArray(data)) {

          const cleanData = data.map((p) => ({
            ...p,
            stock: Number(p.stock) || 0,
            min_stock: Number(p.min_stock) || 5,
            mrp: Number(p.mrp) || 0,
            rent_price: Number(p.rent_price) || 0,
            deposit_price: Number(p.deposit_price) || 0,
            times_rented: Number(p.times_rented) || 0
          }));

          setProducts(cleanData);

        } else {
          setProducts([]);
        }

      })
      .catch((err) => {
        console.error("Inventory fetch error:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));

  }, []);


  // ================= STOCK STATUS =================
  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= minStock) return "Low Stock";
    return "Healthy Stock";
  };


  // ================= FILTER PRODUCTS =================
  const filteredProducts = useMemo(() => {

    return products.filter((p) => {

      const matchesSearch =
        (p.product_name || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        p.category_name === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        getStockStatus(p.stock, p.min_stock) === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;

    });

  }, [products, search, categoryFilter, statusFilter]);


  // ================= KPI CALCULATIONS =================

  const totalProducts = products.length;

  const totalInventoryValue = products.reduce(
    (sum, p) => sum + (p.stock * p.mrp),
    0
  );

  const lowStock = products.filter(
    (p) => p.stock > 0 && p.stock <= p.min_stock
  ).length;

  const outOfStock = products.filter(
    (p) => p.stock === 0
  ).length;

  const healthyStock = products.filter(
    (p) => p.stock > p.min_stock
  ).length;

  const categories =
    [...new Set(products.map((p) => p.category_name))].length;


  // ================= CHART DATA =================

  const stockStatusData = [
    { name: "Healthy", value: healthyStock },
    { name: "Low", value: lowStock },
    { name: "Out", value: outOfStock }
  ];

  const categoryValueData = Object.values(
    products.reduce((acc, p) => {

      const category = p.category_name || "Unknown";
      const value = p.stock * p.mrp;

      if (!acc[category]) {
        acc[category] = { category, value: 0 };
      }

      acc[category].value += value;

      return acc;

    }, {})
  );

  const topProducts = [...products]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 5)
    .map((p) => ({
      name: p.product_name,
      stock: p.stock
    }));


  if (loading) {
    return <div className="inventory-container">Loading inventory...</div>;
  }

  return (

    <div className="inventory-container">

      {/* ================= SUMMARY ================= */}

      <div className="summary-grid">

        <div className="summary-card">
          <h4>Total Products</h4>
          <p>{totalProducts}</p>
        </div>

        <div className="summary-card">
          <h4>Inventory Value</h4>
          <p>₹ {totalInventoryValue.toLocaleString("en-IN")}</p>
        </div>

        <div className="summary-card success">
          <h4>Healthy Stock</h4>
          <p>{healthyStock}</p>
        </div>

        <div className="summary-card warning">
          <h4>Low Stock</h4>
          <p>{lowStock}</p>
        </div>

        <div className="summary-card danger">
          <h4>Out of Stock</h4>
          <p>{outOfStock}</p>
        </div>

        <div className="summary-card">
          <h4>Used Categories</h4>
          <p>{categories}</p>
        </div>

      </div>


      {/* ================= CHARTS ================= */}

      <div className="charts-grid">

        <div className="chart-card">
          <h3>Stock Status</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>

        </div>


        <div className="chart-card">
          <h3>Inventory Value by Category</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryValueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>

        </div>


        <div className="chart-card">
          <h3>Stock Distribution</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie
                data={stockStatusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >

                <Cell fill="#22c55e" />
                <Cell fill="#f59e0b" />
                <Cell fill="#ef4444" />

              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>
          </ResponsiveContainer>

        </div>


        <div className="chart-card">
          <h3>Top Products by Stock</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>



      {/* ================= FILTERS ================= */}

      <div className="inventory-controls">

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>

          {[...new Set(products.map((p) => p.category_name))]
            .filter(Boolean)
            .map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}

        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Healthy Stock">Healthy Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

      </div>



      {/* ================= TABLE ================= */}

      <div className="table-wrapper">

        <table className="inventory-table">

          <thead>
            <tr>
              <th>Product</th>
              <th>Product Code</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Size</th>
              <th>Color</th>
              <th>Stock</th>
              <th>Min Level</th>
              <th>Status</th>
              <th>Cost Price</th>
              <th>Rental Price</th>
              <th>Deposit</th>
              <th>Times Rented</th>
              <th>Last Rented</th>
              <th>Stock Value</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.map((p) => (

              <tr key={p.product_id}>

                <td>{p.product_name}</td>
                <td>{p.code}</td>
                <td>{p.category_name}</td>
                <td>{p.subcategory_id}</td>
                <td>{p.size}</td>
                <td>{p.color}</td>

                <td>{p.stock}</td>
                <td>{p.min_stock}</td>

                <td>

                  <span
                    className={`badge ${
                      getStockStatus(p.stock, p.min_stock) === "Healthy Stock"
                        ? "success"
                        : getStockStatus(p.stock, p.min_stock) === "Low Stock"
                        ? "warning"
                        : "danger"
                    }`}
                  >
                    {getStockStatus(p.stock, p.min_stock)}
                  </span>

                </td>

                <td>₹ {p.mrp}</td>
                <td>₹ {p.rent_price}</td>
                <td>₹ {p.deposit_price}</td>

                <td>{p.times_rented}</td>

                <td>
                  {p.last_rented
                    ? new Date(p.last_rented).toLocaleString("en-IN")
                    : "-"}
                </td>

                <td>
                  ₹ {(p.stock * p.mrp).toLocaleString("en-IN")}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default InventoryModule;