
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiChevronDown,
  FiLayers,
  FiShoppingBag,
  FiMenu,
} from "react-icons/fi";
import "./Sidebar.css";
import logo from "../../assets/images/logo.png";   // adjust path if needed
import { Profiler } from "react";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openMaster, setOpenMaster] = useState(false);
  const [openShop, setOpenShop] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* LOGO */}
        <div className="sidebar-logo">
  <img src={logo} alt="logo" />
  <span>RegalRent</span>
</div>

        {/* ===== GENERAL ===== */}
        <p className="section-title">GENERAL</p>

        <div
          className="sidebar-link"
          onClick={() => setOpenDashboard(!openDashboard)}
        >
          <FiHome className="icon" />
          <span>Dashboard</span>
          {openDashboard ? <FiChevronDown /> : <FiChevronRight />}
        </div>

        {openDashboard && (
          <div className="submenu">
            {/* MASTER ADMIN */}
            <div
              className="sidebar-link submenu-title"
              onClick={() => setOpenMaster(!openMaster)}
            >
              <FiLayers className="icon" />
              <span>Master Admin</span>
              {openMaster ? <FiChevronDown /> : <FiChevronRight />}
            </div>

            {openMaster && (
              <div className="submenu nested">
               <NavLink to="/dashboard/create-package" className="sidebar-link" onClick={closeSidebar}>
  <span className="icon">📦</span>
  <span>Package</span>
</NavLink>

<NavLink to="/dashboard/create-category" className="sidebar-link" onClick={closeSidebar}>
  <span className="icon">🗂️</span>
  <span>Category</span>
</NavLink>

<NavLink to="/dashboard/add-store" className="sidebar-link" onClick={closeSidebar}>
  <span className="icon">🏬</span>
  <span>Add Store</span>
</NavLink>

<NavLink to="/dashboard/store-list" className="sidebar-link" onClick={closeSidebar}>
  <span className="icon">📃</span>
  <span>Store List</span>
</NavLink>
{/* this is try purpose of admin-product ---- */}


{/* <NavLink to="/dashboard/Products" className="sidebar-link" onClick={closeSidebar}>
  <span className="icon">📃</span>
  <span>Admin Product</span>
</NavLink> */}

{/* this is try purpose of admin-product ---- */}


<NavLink to="/dashboard/users" className="sidebar-link" onClick={closeSidebar}>
  <span className="icon">👤</span>
  <span>Users</span>
</NavLink>


              </div>
            )}

            {/* SHOP ADMIN */}
            <div
              className="sidebar-link submenu-title"
              onClick={() => setOpenShop(!openShop)}
            >
              <FiShoppingBag className="icon" />
              <span>Shop Admin</span>
              {openShop ? <FiChevronDown /> : <FiChevronRight />}
            </div>

           {openShop && (
  <div className="submenu nested">

    <NavLink to="/shop-admin/admin-products" className="sidebar-link">
      Add Shop Product
    </NavLink>

    <NavLink to="/shop-admin/categories" className="sidebar-link">
      Category Management
    </NavLink>

    <NavLink to="/shop-admin/shop-products" className="sidebar-link">
      Shop Products List
    </NavLink>

    <NavLink to="/shop-admin/product-book/1" className="sidebar-link">
      Product Booking
    </NavLink>

    <NavLink to="/shop-admin/order-page" className="sidebar-link">
      Order Summary
    </NavLink>

    <NavLink to="/shop-admin/my-order-page" className="sidebar-link">
      My Orders
    </NavLink>

    <NavLink to="/shop-admin/orders" className="sidebar-link">
      Return
    </NavLink>

    <NavLink to="/shop-admin/return-list" className="sidebar-link">
      Return List
    </NavLink>

    <NavLink to="/shop-admin/staff" className="sidebar-link">
      Staff
    </NavLink>

    <NavLink to="/shop-admin/staff-list" className="sidebar-link">
      Staff List
    </NavLink>

    {/* <NavLink to="/shop-admin/settings" className="sidebar-link">
      Settings
    </NavLink>

    <NavLink to="/shop-admin/profile" className="sidebar-link">
      My Profile
    </NavLink>

    <NavLink to="/shop-admin/logout" className="sidebar-link logout">
      Logout
    </NavLink> */}

  </div>
)}












            {/* USER ADMIN */}
            <div
              className="sidebar-link submenu-title"
              onClick={() => setOpenUser(!openUser)}
            >

              {/*   ------------------only USer -------------------- */}
            <FiUsers className="icon" />
  <span>User Admin</span>
  {openUser ? <FiChevronDown /> : <FiChevronRight />}
</div>

{openUser && (
  <div className="submenu nested">

    <NavLink to="/dashboard/user" className="sidebar-link">
      Manage Users
    </NavLink>

    <NavLink to="/dashboard/user/user-home" className="sidebar-link">
      User Home
    </NavLink>

    {/* <NavLink to="/dashboard/user/logout" className="sidebar-link logout">
      Logout
    </NavLink> */}
              </div>
            )}
          </div>
        )}

        {/* ===== MENU ===== */}
        <p className="section-title">MODULES</p>

        <div
          className="sidebar-link"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <FiMenu className="icon" />
          <span>Menu</span>
          {openMenu ? <FiChevronDown /> : <FiChevronRight />}
        </div>

       {openMenu && (
  <div className="submenu">
    <NavLink to="/dashboard/inventory-module" className="sidebar-link">
      Inventory Module
    </NavLink>

    <NavLink to="/dashboard/transaction-module" className="sidebar-link">
      Transaction Module
    </NavLink>

    <NavLink to="/dashboard/general-report" className="sidebar-link">
      General Report
    </NavLink>

    <NavLink to="/dashboard/finance-report" className="sidebar-link">
      Finance Report
    </NavLink>
  </div>
)}





  



        {/* ===== SETTINGS ===== */}
        <p className="section-title">SETTINGS</p>


       <NavLink to="/dashboard/profile" className="sidebar-link">
  <i className="fa fa-user icon"></i>
  <span>My Profile</span>
</NavLink>


<NavLink to="/dashboard/settings" className="sidebar-link">
  <FiSettings className="icon" />
  <span>Settings</span>
</NavLink>

<NavLink to="/dashboard/logout" className="sidebar-link logout">
  <FiLogOut className="icon" />
  <span>Logout</span>
</NavLink>
      </aside>
    </>
  );
};

export default Sidebar;


