

import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./ShopAdminCommon/Sidebar.jsx";
import Header from "./ShopAdminCommon/Header.jsx";
import ShopAdminFooter from "./ShopAdminCommon/ShopFooter.jsx";

import "./shopAdminDashboard.css";

const ShopAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* MAIN AREA */}
      <div className="admin-main">
        {/* HEADER */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* CONTENT */}
        <main className="admin-content">
          {/*  IMPORTANT */}
          <Outlet />
        </main>

        {/* FOOTER */}
        <ShopAdminFooter />
      </div>
    </div>
  );
};

export default ShopAdminDashboard;





