
import React, { useEffect, useState, useMemo } from "react";
import "./dashboard.css";
import "../dashboard/pages/addStore.css";

import { fetchStores } from "../api/storeApi.js";
import { getPackages } from "../api/packages";

import defaultLogo from "../assets/images/logo.png";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

const BACKEND_URL = "http://localhost:5000";

const colors = [
  "#6366F1",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
  "#8B5CF6",
  "#14B8A6"
];

/* STORE VISIBILITY RULE */

const isStoreVisible = (store, packageMap) => {

  const pkg = packageMap[store.package_id];

  if (!pkg) return false;

  if (Number(store.status) !== 1) return false;

  if ((store.manual_status || "active").toLowerCase() !== "active") {
    return false;
  }

  if (store.created_at) {

    const created = new Date(store.created_at);
    const expiry = new Date(created);

    expiry.setDate(created.getDate() + Number(pkg.days));

    if (new Date() > expiry) return false;
  }

  return true;
};

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [stores, setStores] = useState([]);
  const [packages, setPackages] = useState([]);
// here showin container a card , and  details
const [userStats, setUserStats] = useState({
  admin: { total: 0, active: 0, inactive: 0 },
  shopAdmin: { total: 0, active: 0, inactive: 0 },
  users: { total: 0, active: 0, inactive: 0 }
});
// here container B , card show data available product 
const [productStats, setProductStats] = useState({
  totalProducts: 0,
  totalCategories: 0,
   totalSubCategories: 0,
     totalOrders: 0,
      totalProductsOnRent: 0,
  pendingReturns: 0,
  completedReturns: 0
  
});

  const [packageChart, setPackageChart] = useState([]);
  const [categoryChart, setCategoryChart] = useState([]);
  const [revenueChart, setRevenueChart] = useState([]);

  /* LOAD STORES */

  const loadStores = async () => {
    try {
      const res = await fetchStores();
      // setStores(res.data || []);
      console.log("STORE API RESPONSE:", res);

    setStores(res.data.stores || []);

    } catch (err) {
      console.error("Store Load Error:", err);
    }
  };

  /* LOAD PACKAGES */

  const loadPackages = async () => {
    try {
      const data = await getPackages();
      setPackages(data || []);
    } catch (err) {
      console.error("Package Load Error:", err);
    }
  };

  /* LOAD USERS  , container a last sabse card */

const loadUsers = async () => {
  try {

    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();

    const admin = data.filter(u => u.role === "admin");
    const shopAdmin = data.filter(u => u.role === "shop-admin");
    const users = data.filter(u => u.role === "user");

    setUserStats({

      admin: {
        total: admin.length,
        active: admin.filter(u => u.status === "active").length,
        inactive: admin.filter(u => u.status === "inactive").length
      },

      shopAdmin: {
        total: shopAdmin.length,
        active: shopAdmin.filter(u => u.status === "active").length,
        inactive: shopAdmin.filter(u => u.status === "inactive").length
      },

      users: {
        total: users.length,
        active: users.filter(u => u.status === "active").length,
        inactive: users.filter(u => u.status === "inactive").length
      }

    });

  } catch (err) {
    console.error("User Load Error:", err);
  }
};


//  here container B , show total category , and available product

const loadProductStats = async () => {
  try {

    const productRes = await fetch("http://localhost:5000/api/shop_product");
    const productData = await productRes.json();

    const categoryRes = await fetch("http://localhost:5000/api/category");
    const categoryData = await categoryRes.json();
    
     const subCategoryRes = await fetch("http://localhost:5000/api/shop_category");
    const subCategoryData = await subCategoryRes.json();
     
     const orderRes = await fetch("http://localhost:5000/api/order");
    const orderData = await orderRes.json();


    const returnRes = await fetch("http://localhost:5000/api/return/list");
    const returnData = await returnRes.json();



 /* FIXED DATA HANDLING */

const returns = Array.isArray(returnData)
  ? returnData
  : returnData?.data || [];

/* TOTAL PRODUCTS ON RENT */
const totalProductsOnRent = returns.filter(
  r => r.status === "pending"
).length;

/* PENDING RETURNS */
const pendingReturns = returns.filter(
  r => r.status === "pending"
).length;

/* COMPLETED RETURNS */
const completedReturns = returns.filter(
  r => r.status === "returned"
).length;



    setProductStats({
      totalProducts: productData.length || 0,
      totalCategories: categoryData.length || 0,
      totalSubCategories: subCategoryData.length || 0,
       totalOrders: orderData.length || 0,
        totalProductsOnRent, // pending returns = currently rented
      pendingReturns,
      completedReturns
    });

  } catch (err) {
    console.error("Product Stats Load Error:", err);
  }
};




  /* INITIAL LOAD + AUTO REFRESH */

  useEffect(() => {

    const loadAll = async () => {
      await loadStores();
      await loadPackages();
      // container a data 
       await loadUsers(); 
      //  container B data
        await loadProductStats();
    };

    loadAll();

    const interval = setInterval(() => {
      loadAll();
    }, 15000);  // 

    return () => clearInterval(interval);

  }, []);

  /* PACKAGE MAP (FAST LOOKUP) */

  const packageMap = useMemo(() => {
    const map = {};
    packages.forEach(p => {
      map[p.id] = p;
    });
    return map;
  }, [packages]);

  /* FILTERED STORES */

  const visibleStores = useMemo(() => {
    return stores.filter(s => isStoreVisible(s, packageMap));
  }, [stores, packageMap]);

  /* BUILD ANALYTICS */

  useEffect(() => {

    if (!visibleStores.length) {
      setPackageChart([]);
      setCategoryChart([]);
      setRevenueChart([]);
      return;
    }

    const packageCounts = {};
    const categoryCounts = {};
    const revenueCounts = {};

    visibleStores.forEach((s) => {

      const pkg = packageMap[s.package_id];
      const pkgName = pkg ? pkg.package_name : "No Package";

      packageCounts[pkgName] = (packageCounts[pkgName] || 0) + 1;

      const price = pkg ? Number(pkg.price || 0) : 0;
      revenueCounts[pkgName] = (revenueCounts[pkgName] || 0) + price;

      let cats = [];

      try {
        cats = Array.isArray(s.categories)
          ? s.categories
          : JSON.parse(s.categories || "[]");
      } catch {
        cats = [];
      }

      cats.forEach(c => {
        categoryCounts[c] = (categoryCounts[c] || 0) + 1;
      });

    });

    setPackageChart(
      Object.keys(packageCounts).map(k => ({
        name: k,
        members: packageCounts[k]
      }))
    );

    setCategoryChart(
      Object.keys(categoryCounts).map(k => ({
        name: k,
        value: categoryCounts[k]
      }))
    );

    setRevenueChart(
      Object.keys(revenueCounts).map(k => ({
        name: k,
        revenue: revenueCounts[k]
      }))
    );

  }, [visibleStores, packageMap]);



  return (

    <div className="dashboard-container">

      <div className="dashboard-header">
        <h2>Welcome, {user?.name || "Admin"} 👋</h2>
      </div>

      {/* MEMBER CARDS */}

      <div className="dashboard-box">

        <h3>Our Currently  Members</h3>

        <div className="profile-grid">

          {visibleStores.map((u) => {

            const pkg = packageMap[u.package_id];

            let categories = [];

            try {
              categories = Array.isArray(u.categories)
                ? u.categories
                : JSON.parse(u.categories || "[]");
            } catch {
              categories = [];
            }

            return (
              <div className="profile-card temple-card" key={u.id}>

                <img
                  className="card-logo"
                  src={u.logo ? `${BACKEND_URL}${u.logo}` : defaultLogo}
                  alt="logo"
                />

                <div className="store-name">
                  Name: {u.name}
                </div>

                <div className="store-package">
                  Package: {pkg ? pkg.package_name : "No Package"}
                </div>

                <div className="store-category">
                  Category: {categories.join(", ") || "No Category"}
                </div>

                <div className="divider"></div>

                <div className="bank-details">
                  <div>Bank Name: {u.bank_name || "-"}</div>
                  <div>Account No: {u.account_no || "-"}</div>
                  <div>Holder Name: {u.account_holder || "-"}</div>
                  <div>IFSC Code: {u.ifsc_code || "-"}</div>
                </div>

              </div>
            );

          })}

        </div>

      </div>

      {/* PACKAGE CHART */}

      <div className="dashboard-box">

        <h3>Membership by Package</h3>

        <ResponsiveContainer width="100%" height={350}>

          <BarChart data={packageChart}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Legend />

            <Bar dataKey="members">

              {packageChart.map((entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* CATEGORY PIE */}

      <div className="dashboard-box">

        <h3>Category Distribution</h3>

        <ResponsiveContainer width="100%" height={320}>

          <PieChart>

            <Pie
              data={categoryChart}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >

              {categoryChart.map((entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* REVENUE */}

      <div className="dashboard-box">

        <h3>Revenue by Package</h3>

        <ResponsiveContainer width="100%" height={320}>

          <BarChart data={revenueChart}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="revenue" fill="#22C55E" />

          </BarChart>

        </ResponsiveContainer>
        

      </div>
      {/* ===== CONTAINER A ===== */}
     {/* ===== CONTAINER A ===== */}
<div className="dashboard-box full-width-box">

<h3>Our Teams</h3>

<div className="dashboard-user-stats-grid">

  {/* ADMIN */}
  <div className="dashboard-user-card-new">

    <div className="dashboard-user-card-header">
      <span>Admins</span>
      <strong>{userStats.admin.total}</strong>
    </div>

    <div className="dashboard-user-divider"></div>

    <div className="dashboard-user-status active">
      Active : {userStats.admin.active}
    </div>

    <div className="dashboard-user-status inactive">
      Inactive : {userStats.admin.inactive}
    </div>

  </div>

  {/* SHOP ADMIN */}
  <div className="dashboard-user-card-new">

    <div className="dashboard-user-card-header">
      <span>Shop Admins</span>
      <strong>{userStats.shopAdmin.total}</strong>
    </div>

    <div className="dashboard-user-divider"></div>

    <div className="dashboard-user-status active">
      Active : {userStats.shopAdmin.active}
    </div>

    <div className="dashboard-user-status inactive">
      Inactive : {userStats.shopAdmin.inactive}
    </div>

  </div>

  {/* USERS */}
  <div className="dashboard-user-card-new">

    <div className="dashboard-user-card-header">
      <span>Users</span>
      <strong>{userStats.users.total}</strong>
    </div>

    <div className="dashboard-user-divider"></div>

    <div className="dashboard-user-status active">
      Active : {userStats.users.active}
    </div>

    <div className="dashboard-user-status inactive">
      Inactive : {userStats.users.inactive}
    </div>

  </div>

</div>
</div>


{/* ===== CONTAINER B ===== */}

<div className="dashboard-box full-width-box">

<h3>Inventory Overview</h3>

<div className="dashboard-user-stats-grid">

  <div className="dashboard-user-card-new">
    <div className="dashboard-user-card-header">
      <span>Total Products</span>
      <strong>{productStats.totalProducts}</strong>
    </div>
  </div>

  <div className="dashboard-user-card-new">
    <div className="dashboard-user-card-header">
      <span>Total Categories</span>
      <strong>{productStats.totalCategories}</strong>
    </div>
  </div>

  <div className="dashboard-user-card-new">
    <div className="dashboard-user-card-header">
      <span>Total Sub Categories</span>
      <strong>{productStats.totalSubCategories}</strong>
    </div>
  </div>

  <div className="dashboard-user-card-new">
    <div className="dashboard-user-card-header">
      <span>Total Orders</span>
      <strong>{productStats.totalOrders}</strong>
    </div>
  </div>

  <div className="dashboard-user-card-new">
    <div className="dashboard-user-card-header">
      <span>Total Products on Rent</span>
      <strong>{productStats.totalProductsOnRent}</strong>
    </div>
  </div>

  <div className="dashboard-user-card-new">
    <div className="dashboard-user-card-header">
      <span>Pending Returns</span>
      <strong>{productStats.pendingReturns}</strong>
    </div>
  </div>

  <div className="dashboard-user-card-new">
    <div className="dashboard-user-card-header">
      <span>Return Completed</span>
      <strong>{productStats.completedReturns}</strong>
    </div>
  </div>

</div>
</div>
<div className="dashboard-box">

  <h3>Orders vs Products on Rent</h3>

  <ResponsiveContainer width="100%" height={300}>

    <BarChart
      data={[
        { name: "Orders", value: productStats.totalOrders },
        { name: "Products on Rent", value: productStats.totalProductsOnRent }
      ]}
    >

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="name" />

      <YAxis />

      <Tooltip />

      <Bar dataKey="value">

        <Cell fill="#6366F1" />
        <Cell fill="#F59E0B" />

      </Bar>

    </BarChart>

  </ResponsiveContainer>

</div>

<div className="dashboard-box">

  <h3>Returns Status</h3>

  <ResponsiveContainer width="100%" height={300}>

    <PieChart>

      <Pie
        data={[
          { name: "Pending", value: productStats.pendingReturns },
          { name: "Completed", value: productStats.completedReturns }
        ]}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
        label
      >

        <Cell fill="#F59E0B" />
        <Cell fill="#22C55E" />

      </Pie>

      <Tooltip />
      <Legend />

    </PieChart>

  </ResponsiveContainer>

</div>
   </div>
   


  );
}

export default Dashboard;