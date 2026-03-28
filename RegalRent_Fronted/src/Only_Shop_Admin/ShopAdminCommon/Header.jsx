


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Heart, ShoppingCart , LogOut } from "lucide-react";
import axios from "axios";
import "./header.css";
import { getCartApi } from "../../api/shopAdmin/shopCartApi.js";
import { getWishlistApi } from "../../api/shopAdmin/wishlist/wishlistApi.js";


const API_URL = "http://localhost:5000/api/shop-user-notification";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Loading...",
    role: "Shop Admin",
    avatar: ""
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // 🔥 NEW: notification state
  const [notifications, setNotifications] = useState([]);

  const getToken = () => localStorage.getItem("token");

  /* ================= FETCH NOTIFICATIONS ================= */
  const fetchNotifications = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success) {
        setNotifications(res.data.notifications || []);
      }
    } catch (err) {
      console.log("Notification error:", err);
    }
  };

  /* ================= UNREAD COUNT ================= */
  const unreadCount = notifications.filter(n => !n.is_read).length;

  /* ================= FETCH PROFILE ================= */
  const fetchUser = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id;

      if (!userId) throw new Error("No userId found");

      const res = await fetch(
        `http://localhost:5000/api/auth/profile?userId=${userId}`
      );

      const data = await res.json();

      setUser({
        name: data.name || "Shop Admin",
        role: data.role || "Shop Admin",
        avatar: data.profile_image || storedUser?.avatar || ""
      });

    } catch (err) {
      console.error("Fetch user error:", err);
    }
  };

  /* ================= LOAD CART ================= */
  const loadCartCount = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id || 1;

      const res = await getCartApi(userId);
      const cart = res.data || [];

      const totalQty = cart.reduce((sum, item) => {
        return sum + (item.quantity || 1);
      }, 0);

      setCartCount(totalQty);

    } catch (err) {
      console.error("Cart load error:", err);
    }
  };

  /* ================= LOAD WISHLIST ================= */
 
const loadWishlistCount = async () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser?.id) return;

    const res = await getWishlistApi(storedUser.id);

    const wishlist = res.data.wishlist || [];

    setWishlistCount(wishlist.length);

  } catch (err) {
    console.error("Wishlist count error:", err);
  }
};

  /* ================= PROFILE UPDATE ================= */
  const handleProfileUpdate = (e) => {
    let newImage = e?.detail;

    if (!newImage) {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      newImage = storedUser.avatar || storedUser.profile_image || "";
    }

    if (!newImage) return;

    setUser((prev) => ({
      ...prev,
      avatar: newImage
    }));

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    storedUser.avatar = newImage;
    storedUser.profile_image = newImage;

    localStorage.setItem("user", JSON.stringify(storedUser));
  };

  /* ================= USE EFFECT ================= */
  useEffect(() => {
    fetchUser();
    loadCartCount();
    loadWishlistCount();
    fetchNotifications(); // 🔥 NEW

    // 🔥 auto refresh notifications
    const interval = setInterval(fetchNotifications, 10000);

    window.addEventListener("userUpdated", handleProfileUpdate);
    window.addEventListener("cartUpdated", loadCartCount);
    window.addEventListener("wishlistUpdated", loadWishlistCount);

    return () => {
      clearInterval(interval);
      window.removeEventListener("userUpdated", handleProfileUpdate);
      window.removeEventListener("cartUpdated", loadCartCount);
      window.removeEventListener("wishlistUpdated", loadWishlistCount);
    };

  }, []);

  return (
    <header className="admin-header">

      <div className="admin-header-left">
        <button
          className="hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <span className="header-title">Shop Dashboard</span>
      </div>

      <div className="admin-header-right">

        {/* 🔔 NOTIFICATION */}
        <div
          className="shop-user-notification"
          onClick={() => navigate("/shop-admin/shop-user-notification")}
        >
          <Bell size={23} />

          {unreadCount > 0 && (
            <span className="notification-badge">
              {unreadCount}
            </span>
          )}
        </div>

        {/* CART */}
        <div
          className="cart-box"
          onClick={() => navigate("/shop-admin/cart")}
        >
          <ShoppingCart size={22} />
          <span className="cart-badge">{cartCount}</span>
        </div>

        {/* WISHLIST */}
        <div
          className="wishlist-box"
          onClick={() => navigate("/shop-admin/wishlist")}
        >
          <Heart size={20} fill="#ff3b5c" color="#ff3b5c" />
          {wishlistCount > 0 && (
            <span className="wishlist-badge">
              {wishlistCount}
            </span>
          )}
        </div>

        {/* PROFILE (same as before) */}
        <div
          className="profile-box"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {user.avatar ? (
            <img src={user.avatar} alt="profile" className="profile-avatar" />
          ) : (
            <div className="profile-fallback">
              {user.name?.charAt(0)}
            </div>
          )}

          <div className="profile-info">
            <span className="profile-name">{user.name}</span>
            <span className="profile-role">{user.role}</span>
          </div>

          <span className="profile-arrow">▾</span>

          {dropdownOpen && (
            <div className="profile-dropdown">
              <div onClick={() => navigate("/shop-admin/profile")}>
                My Profile
              </div>
              <div onClick={() => navigate("/shop-admin/settings")}>
                Settings
              </div>
              <div
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                <LogOut className="dropdown-icon" />
    Logout
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;

