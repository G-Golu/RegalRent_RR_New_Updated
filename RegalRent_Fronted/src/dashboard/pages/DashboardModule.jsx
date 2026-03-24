

import { useState } from "react";
import { NavLink } from "react-router-dom";

const DashboardModule = ({ closeSidebar }) => {
  const [openMenu, setOpenMenu] = useState(true); //  true hi rahe

  const handleClick = () => {
    if (window.innerWidth < 1024 && closeSidebar) {
      closeSidebar();
    }
  };

  return (
    <div className="dashboard-module">
      <div
        className="sidebar-link"
        onClick={() => setOpenMenu(prev => !prev)}
      >
        Dashboard Module ▾
      </div>

      {openMenu && (
        <div className="submenu">
          <NavLink to="/dashboard/create-package" className="submenu-item" onClick={handleClick}>
            Package
          </NavLink>

          <NavLink to="/dashboard/create-category" className="submenu-item" onClick={handleClick}>
            Category
          </NavLink>

          <NavLink to="/dashboard/add-store" className="submenu-item" onClick={handleClick}>
            Store Add
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default DashboardModule;

