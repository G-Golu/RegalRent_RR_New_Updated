// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import "./Sidebar.css";

// const Sidebar = ({ isOpen, closeSidebar }) => {
//   const [openDashboard, setOpenDashboard] = useState(false);
//   const [openMenu, setOpenMenu] = useState(false);

//   return (
//     <>
//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div className="sidebar-overlay" onClick={closeSidebar}></div>
//       )}

//       {/* Sidebar */}
//       <aside className={`sidebar ${isOpen ? "open" : ""}`}>
//         {/* ================= TOP SECTION ================= */}
//         <div className="sidebar-section">
//           <h2 className="logo-text">RentalRent</h2>

//           {/* DASHBOARD */}
//           <div
//             className="sidebar-link"
//             onClick={() => setOpenDashboard(!openDashboard)}
//           >
//             <span className="icon">🏠</span>
//             <span>Dashboard</span>
//           </div>

//           {openDashboard && (
//             <div className="submenu">
//               <NavLink
//                 to="/dashboard/available-modules"
//                 className="sidebar-link"
//                 onClick={closeSidebar}
//               >
//                 Available Module
//               </NavLink>

//               <NavLink
//                 to="/dashboard/catalogue-modules"
//                 className="sidebar-link"
//                 onClick={closeSidebar}
//               >
//                 Catalogue Module
//               </NavLink>
//             </div>
//           )}

//           {/* MENU */}
//           <div
//             className="sidebar-link"
//             onClick={() => setOpenMenu(!openMenu)}
//           >
//             <span className="icon">☰</span>
//             <span>Menu</span>
//           </div>

//           {openMenu && (
//             <div className="submenu">
//               <NavLink to="/dashboard/master-module" className="sidebar-link" onClick={closeSidebar}>
//                 Master Module
//               </NavLink>

//               <NavLink to="/dashboard/inventory-module" className="sidebar-link" onClick={closeSidebar}>
//                 Inventory Module
//               </NavLink>

//               <NavLink to="/dashboard/transaction-module" className="sidebar-link" onClick={closeSidebar}>
//                 Transaction Module
//               </NavLink>

//               <NavLink to="/dashboard/general-report" className="sidebar-link" onClick={closeSidebar}>
//                 General Report
//               </NavLink>

//               <NavLink to="/dashboard/finance-report" className="sidebar-link" onClick={closeSidebar}>
//                 Finance Report
//               </NavLink>
//             </div>
//           )}

//           {/* NORMAL LINKS */}
//           <Link to="/dashboard/orders" className="sidebar-link" onClick={closeSidebar}>
//             <span className="icon">📦</span>
//             <span>Admin Orders</span>
//           </Link>

//           <NavLink to="/dashboard/products" className="sidebar-link" onClick={closeSidebar}>
//             <span className="icon">👕</span>
//             <span>Products</span>
//           </NavLink>

//           <NavLink to="/dashboard/filter" className="sidebar-link" onClick={closeSidebar}>
//             <span className="icon">🎛️</span>
//             <span>Filter</span>
//           </NavLink>

//           <NavLink to="/dashboard/users" className="sidebar-link" onClick={closeSidebar}>
//             <span className="icon">👤</span>
//             <span>Users</span>
//           </NavLink>
          
//         </div>

//         {/* ================= SETTINGS SECTION ================= */}
//         <div className="sidebar-section">
//           <p className="section-title">SETTINGS</p>

//           <NavLink to="/dashboard/settings" className="sidebar-link" onClick={closeSidebar}>
//             <span className="icon">⚙️</span>
//             <span>Settings</span>
//           </NavLink>

//           <NavLink to="/dashboard/profile" className="sidebar-link" onClick={closeSidebar}>
//             <span className="icon">🧑‍💼</span>
//             <span>Profile</span>
//           </NavLink>

//           <NavLink to="/dashboard/logout" className="sidebar-link logout" onClick={closeSidebar}>
//             <span className="icon">🚪</span>
//             <span>Logout</span>
//           </NavLink>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;


// above are correct currently



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




























// this is use for rolewise connect 
// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import "./Sidebar.css";

// const Sidebar = ({ isOpen, closeSidebar }) => {
//   const [openDashboard, setOpenDashboard] = useState(false);
//   const [openMenu] = useState(false);

//   return (
//     <>
//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div className="sidebar-overlay" onClick={closeSidebar}></div>
//       )}

//       {/* Sidebar */}
//       <aside className={`sidebar ${isOpen ? "open" : ""}`}>
//         {/* ================= TOP SECTION ================= */}
//         <div className="sidebar-section">
//           <h2 className="logo-text">RentalRent</h2>

//           {/* DASHBOARD */}
//           <div
//             className="sidebar-link"
//             onClick={() => setOpenDashboard(!openDashboard)}
//           >
//             <span className="icon">🏠</span>
//             <span>Dashboard</span>
//           </div>

//          {/* DASHBOARD */}
// {openDashboard && (
//   <div className="submenu">
//     <NavLink to="/dashboard/admin/available-modules" className="sidebar-link">
//       Available Module
//     </NavLink>

//     <NavLink to="/dashboard/admin/catalogue-modules" className="sidebar-link">
//       Catalogue Module
//     </NavLink>
//   </div>
// )}

// {/* MENU */}
// {openMenu && (
//   <div className="submenu">
//     <NavLink to="/dashboard/admin/master-module" className="sidebar-link">
//       Master Module
//     </NavLink>

//     <NavLink to="/dashboard/admin/inventory-module" className="sidebar-link">
//       Inventory Module
//     </NavLink>

//     <NavLink to="/dashboard/admin/transaction-module" className="sidebar-link">
//       Transaction Module
//     </NavLink>

//     <NavLink to="/dashboard/admin/general-report" className="sidebar-link">
//       General Report
//     </NavLink>

//     <NavLink to="/dashboard/admin/finance-report" className="sidebar-link">
//       Finance Report
//     </NavLink>
//   </div>
// )}

// {/* NORMAL LINKS */}
// <Link to="/dashboard/admin/orders" className="sidebar-link">
//   📦 Admin Orders
// </Link>

// <NavLink to="/dashboard/admin/products" className="sidebar-link">
//   👕 Products
// </NavLink>

// <NavLink to="/dashboard/admin/filter" className="sidebar-link">
//   🎛️ Filter
// </NavLink>

// <NavLink to="/dashboard/admin/users" className="sidebar-link">
//   👤 Users
// </NavLink>

// {/* SETTINGS */}
// <NavLink to="/dashboard/admin/settings" className="sidebar-link">
//   ⚙️ Settings
// </NavLink>

// <NavLink to="/dashboard/admin/profile" className="sidebar-link">
//   🧑‍💼 Profile
// </NavLink>

// <NavLink to="/dashboard/admin/logout" className="sidebar-link logout">
//   🚪 Logout
// </NavLink>

//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;
