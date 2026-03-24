import { NavLink } from "react-router-dom";
import { FiHome, FiShoppingBag, FiUser, FiSettings } from "react-icons/fi";
import "../../Only_User/userAll.css";

const Sidebar = () => {
  return (
    <div className="user-sidebar">
      <div className="sidebar-header">
        <h2>USER</h2>
      </div>

      <nav className="sidebar-menu">

        {/* Dashboard */}
        <NavLink
          to="/dashboard/user"
          end
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiHome className="icon" />
          <span>Dashboard</span>
        </NavLink>

         <NavLink
          to="/dashboard/user/user-home"
          end
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiHome className="icon" />
          <span>User Home</span>
        </NavLink>

       
       

      </nav>
    </div>
  );
};

export default Sidebar;