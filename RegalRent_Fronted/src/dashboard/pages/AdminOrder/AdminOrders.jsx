// src/AdminOrders/AdminOrders.jsx
import UserOrderBox from "./UserOrderBox.jsx";
import ShopAdminOrderBox from "./ShopAdminOrderBox.jsx";
import "./adminOrders.css";

const AdminOrders = () => {
  return (
    <div className="admin-orders-page">
      <h1 className="page-title">Admin Orders</h1>

      <div className="orders-wrapper">
        <UserOrderBox />
        <ShopAdminOrderBox />
      </div>
    </div>
  );
};

export default AdminOrders;
