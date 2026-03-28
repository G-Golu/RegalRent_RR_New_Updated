


import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

/* PUBLIC */
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPasswordPage from "./auth/ForgetPassword.jsx";
import ResetPasswordPage from "./auth/ResetPassword.jsx";

/* ADMIN */
import DashboardLayout from "./dashboard/DashboardLayout";
import Dashboard from "./dashboard/Dashboard.jsx";
import AvailableModule from "./dashboard/pages/AvailableModule";
import CatalogueModule from "./dashboard/pages/CatalogueModule";
import Menu from "./dashboard/pages/Menu";
import AdminOrders from "./dashboard/pages/AdminOrder/AdminOrders";
import Users from "./dashboard/pages/Users";
import Products from "./dashboard/pages/Products";
import Filter from "./dashboard/pages/Filter";
import Profile from "./dashboard/pages/Profile";
import Settings from "./dashboard/pages/Settings";
import Logout from "./dashboard/pages/Logout";

import UserRequestList from "./dashboard/pages/UserRequestList.jsx";  // this is new added for header notification user request list
// this is new added -- user request list =  admin header notification 

import MasterModule from "./dashboard/pages/MasterModule";
import InventoryModule from "./dashboard/pages/MenuPages/InventoryModule";
import TransactionModule from "./dashboard/pages/MenuPages/TransactionModule";
import GeneralReport from "./dashboard/pages/MenuPages/GeneralReport";
import FinanceReport from "./dashboard/pages/MenuPages/FinanceReport";

import Create_Package from "./dashboard/pages/Create_Package";
import Category from "./dashboard/pages/Create_Category";
import Add_Store from "./dashboard/pages/Add_Store";
import StoreList from "./dashboard/pages/StoreList";
import RecentActivities from "./dashboard/pages/RecentActivities";

/* USER */
import Layout from "./Only_User/components/Layout.jsx";
import UserDashboard from "./Only_User/UserDashboard.jsx";
import UserHome from "./Only_User/pages/UserHome.jsx";
import UserLogout from "./Only_User/pages/Logout.jsx";

/* SHOP ADMIN */
import ShopAdminDashboard from "./Only_Shop_Admin/ShopAdminDashboard";
import ProductManagement from "./Only_Shop_Admin/Admin_Product_Management/ShopProductManagement";
import ShpPrdList from "./Only_Shop_Admin/Admin_Product_Management/ShopProductList.jsx";
import CategoryManagement from "./Only_Shop_Admin/Category_Management/CategoryManagement";


import ProductBook from "./Only_Shop_Admin/Admin_Product_Management/ProductBooking.jsx";
import AddToCart from "./Only_Shop_Admin/Cart/AddCart.jsx";
import WishlistPage from "./Only_Shop_Admin/wishlist/wishlist.jsx";
import CheckoutPage from "./Only_Shop_Admin/CheckOut/CheckOut.jsx";

import OrderPage from "./Only_Shop_Admin/Orders/ShopOrderSummary.jsx";
import Payment from "./Only_Shop_Admin/PaymentOnly/PaymentPage.jsx";
import PaymentSuccess from "./Only_Shop_Admin/PaymentOnly/PaymentSuccess.jsx";

import OrderHistory from "./Only_Shop_Admin/OrderHistory/History.jsx";
import MyOrderPage from "./Only_Shop_Admin/Orders/MyOrder/MyOrder.jsx";

import ShopReceipt from "./Only_Shop_Admin/Orders/ShopReceipt.jsx";

import Staff from "./Only_Shop_Admin/StaffManagement/StaffDetail.jsx";
import StaffList from "./Only_Shop_Admin/StaffManagement/StaffList.jsx";

import ShopAdminSettings from "./Only_Shop_Admin/ShopAdminCommon/ShopAdminSetting";
import ShopAdminProfile from "./Only_Shop_Admin/Shop-Admin_Profile/ShopAdminProfile";
import ShopAdminLogout from "./Only_Shop_Admin/Shop-Admin_Profile/ShopAdminLogout";

import ShopNotifications from "./Only_Shop_Admin/ShopAdminCommon/ShopUserNotification/ShopUserNotification.jsx";

import ReturnList from "./Only_Shop_Admin/ReturnManagement/ReturnList.jsx";
import ReturnPage from "./Only_Shop_Admin/ReturnManagement/Return.jsx";

function App() {
  return (
    <ThemeProvider>

      <Routes>

        {/* ✅ PUBLIC */}
        <Route path="/" element={<><Home /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* 🔐 ADMIN */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="available-modules" element={<AvailableModule />} />
          <Route path="catalogue-modules" element={<CatalogueModule />} />
          <Route path="menu" element={<Menu />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="filter" element={<Filter />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<Logout />} />
          
          <Route path="user_requestlist" element={<UserRequestList />} />  
          {/* this is new added -- user request list =  admin header notification  */}

          <Route path="master-module" element={<MasterModule />} />
          <Route path="inventory-module" element={<InventoryModule />} />
          <Route path="transaction-module" element={<TransactionModule />} />
          <Route path="general-report" element={<GeneralReport />} />
          <Route path="finance-report" element={<FinanceReport />} />

          <Route path="create-package" element={<Create_Package />} />
          <Route path="create-category" element={<Category />} />
          <Route path="add-store" element={<Add_Store />} />
          <Route path="store-list" element={<StoreList />} />
          <Route path="recent-activities" element={<RecentActivities />} />
        </Route>

        {/* 🔐 SHOP ADMIN */}
        <Route
          path="/shop-admin"
          element={
            <ProtectedRoute role="shop-admin">
              <ShopAdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="admin-products" element={<ProductManagement />} />
          <Route path="shop-products" element={<ShpPrdList />} />
          <Route path="categories" element={<CategoryManagement />} />
         
         <Route path="shop-user-notification" element={<ShopNotifications />} />

        
          <Route path="shop-order/:orderGroupId" element={<ShopReceipt />} />
          <Route path="staff" element={<Staff />} />
          <Route path="staff-list" element={<StaffList />} />
          <Route path="settings" element={<ShopAdminSettings />} />
          <Route path="profile" element={<ShopAdminProfile />} />
          <Route path="logout" element={<ShopAdminLogout />} />
          <Route path="product-book/:id" element={<ProductBook />} />
          <Route path="cart" element={<AddToCart />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="payment-page" element={<Payment />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="order-page" element={<OrderPage />} />
          <Route path="order-history" element={<OrderHistory />} />
          <Route path="my-order-page" element={<MyOrderPage />} />
        
          <Route path="return-list" element={<ReturnList />} />
          <Route path="return/:orderId" element={<ReturnPage />} />
        </Route>

        {/* 🔐 USER */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute role="user">
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="user-home" element={<UserHome />} />
          <Route path="logout" element={<UserLogout />} />
        </Route>

      </Routes>

    </ThemeProvider>
  );
}

export default App;