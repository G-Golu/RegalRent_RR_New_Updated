import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import "../../Only_User/userAll.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="page-content">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;