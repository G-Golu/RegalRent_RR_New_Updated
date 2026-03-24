import { NavLink } from "react-router-dom";
import {
  Box,
  Package,
  Layers,
  ShoppingBag,
  FileText,
  Users,
  RotateCcw,
  Settings,
  User,
  LogOut,
  ClipboardList,
  PackageX,
  
} from "lucide-react"; //  Use only valid exports
import "./Sidebar.css";
import { AiOutlineRollback } from "react-icons/ai";

const lastOrderId = localStorage.getItem("lastReturnOrderId");

const Sidebar = ({ sidebarOpen }) => {
  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      {/* LOGO */}
      <div className="logo-box">
        <span className="logo-text">Shop Admin</span>
      </div>

      {/* MENU */}
      <nav className="menu">
        <NavLink to="/shop-admin/admin-products" className="menu-item">
          <Box className="icon" />
          Add Shop Product
        </NavLink>

        <NavLink to="/shop-admin/categories" className="menu-item">
          <Layers className="icon" />
          Category Management
        </NavLink>

        {/* Shop Products */}
        <NavLink to="/shop-admin/shop-products" className="menu-item">
          <ShoppingBag className="icon" />
          Shop Products List
        </NavLink>

        <NavLink to="/shop-admin/product-book/:id" className="menu-item">
          <ShoppingBag className="icon" />
          Product Booking
        </NavLink>

       

        <NavLink to="/shop-admin/order-page" className="menu-item">
          <FileText className="icon" />
          {/* Order_New */}
          Order Summary
        </NavLink>

        <NavLink to="/shop-admin/my-order-page" className="menu-item">
          <ClipboardList className="icon" />
          <span>My Orders</span>
        </NavLink>

        
        

      

<NavLink
  to={lastOrderId ? `/shop-admin/return/${lastOrderId}` : "/shop-admin/orders"}
  className="menu-item"
>
  <RotateCcw className="icon" />
  <span>Return</span>
</NavLink>


         <NavLink to="/shop-admin/return-list" className="menu-item">
          <PackageX className="icon" />
          <span>ReturnList</span>
        </NavLink>

        <NavLink to="/shop-admin/staff" className="menu-item">
          <Users className="icon" />
          Staff
        </NavLink>

        <NavLink to="/shop-admin/staff-list" className="menu-item">
          <ClipboardList className="icon" />
          Staff List
        </NavLink>

        <NavLink to="/shop-admin/settings" className="menu-item">
          <Settings className="icon" />
          Settings
        </NavLink>

        <NavLink to="/shop-admin/profile" className="menu-item">
          <User className="icon" />
          My Profile
        </NavLink>

        <NavLink to="/shop-admin/logout" className="menu-item logout-link">
          <LogOut className="icon" />
          Logout
        </NavLink>
      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <span>Version 1.0.0</span>
      </div>
    </aside>
  );
};

export default Sidebar;
