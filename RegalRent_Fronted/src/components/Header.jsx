

import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./Header.css";

// ✅ IMPORT APIs
import {
  getUnreadCount,
  markAllAsSeen,
} from "../api/userRequestListApi.js";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  /* ===== NOTIFICATION STATE ===== */
  const [notifCount, setNotifCount] = useState(0);

  /* ===== USER STATE ===== */
  const [user, setUser] = useState(() => {
    let storedUser = null;
    try {
      storedUser = JSON.parse(localStorage.getItem("user"));
    } catch {
      storedUser = null;
    }
    return storedUser && storedUser.id ? storedUser : null;
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isLandingPage = location.pathname === "/";

  /* ===== SCROLL FUNCTION ===== */
  const scrollToSection = (id) => {
    if (!isLandingPage) {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  /* ===== 🔔 FETCH NOTIFICATION COUNT (REAL TIME) ===== */
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await getUnreadCount();
        setNotifCount(res.count);
      } catch (err) {
        console.error("Notification error:", err);
      }
    };

    fetchCount();

    const interval = setInterval(fetchCount, 3000); // every 3 sec

    return () => clearInterval(interval); // ✅ cleanup
  }, []);

  /* ===== 🔔 CLICK NOTIFICATION ===== */
  const handleNotificationClick = async () => {
    try {
      await markAllAsSeen(); // mark as read
      setNotifCount(0); // remove badge instantly
      navigate("/dashboard/user_requestlist");
    } catch (err) {
      console.error(err);
    }
  };

  /* ===== USER UPDATE LISTENER ===== */
  useEffect(() => {
    const handleUserUpdate = () => {
      let storedUser = null;
      try {
        storedUser = JSON.parse(localStorage.getItem("user"));
      } catch {
        storedUser = null;
      }

      const validUser =
        storedUser && storedUser.id ? storedUser : null;

      setUser((prevUser) => {
        if (JSON.stringify(prevUser) === JSON.stringify(validUser)) {
          return prevUser;
        }
        return validUser;
      });
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () =>
      window.removeEventListener("userUpdated", handleUserUpdate);
  }, []);

  /* ===== CLOSE DROPDOWN ===== */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatarUrl = user?.profile_image || "/user-icon.png";

  return (
    <header className="app-header">
      {/* LOGO */}
      <div className="header-left">
        <span className="header-logo">
          {isLandingPage ? "RegalRental" : "Admin Dashboard"}
        </span>
      </div>

      {/* SEARCH */}
      {!isLandingPage && (
        <div className="header-center">
          <input
            type="text"
            placeholder="Search..."
            className="header-search"
          />
        </div>
      )}

      {/* MENU */}
      {isLandingPage && (
        <nav className="header-menu">
          <button onClick={() => window.dispatchEvent(new Event("toggleChatbot"))}>
            Chat Us
          </button>
          <button onClick={() => scrollToSection("services")}>Services</button>
          <button onClick={() => scrollToSection("blocks")}>Blocks</button>
          <button onClick={() => scrollToSection("features")}>Features</button>
          <button onClick={() => scrollToSection("technology")}>Technology</button>
          <button onClick={() => scrollToSection("team")}>Our Team</button>
          <button onClick={() => scrollToSection("about")}>About Us</button>
          <button onClick={() => scrollToSection("collections")}>Collections</button>
          <button onClick={() => scrollToSection("contact")}>Contact Us</button>
          <button onClick={() => scrollToSection("plans")}>Our Plans</button>
        </nav>
      )}

      {/* RIGHT SIDE */}
      <div className="header-right">

        {/* 🔔 NOTIFICATION */}
        {user && !isLandingPage && (
          <div
            className="hdr-notif-box"
            onClick={handleNotificationClick}
          >
            <NotificationsIcon className="hdr-notif-icon" />

            {notifCount > 0 && (
              <span className="hdr-notif-badge">
                {notifCount}
              </span>
            )}
          </div>
        )}

        {/* NOT LOGGED IN */}
        {!user && (
          <div
            className="login-icon"
            onClick={() => navigate("/login")}
          >
            <AccountCircleIcon fontSize="large" />
          </div>
        )}

        {/* LOGGED IN */}
        {user && (
          <div className="profile-box" ref={dropdownRef}>
            <div
              className="avatar-click"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={avatarUrl}
                alt="User"
                className="header-avatar-img"
                onError={(e) => {
                  if (
                    e.target.src !==
                    window.location.origin + "/user-icon.png"
                  ) {
                    e.target.src = "/user-icon.png";
                  }
                }}
              />
            </div>

            {!isLandingPage && (
              <div className="profile-details">
                <span className="profile-name">
                  {user?.name || "User"}
                </span>
                <span className="profile-role">
                  {user?.role || "User"}
                </span>
              </div>
            )}

            <span className="profile-arrow">▾</span>

            {dropdownOpen && (
              <div className="profile-dropdown">
                <div
                  className="dropdown-item"
                  onClick={() => navigate("/dashboard/profile")}
                >
                  My Profile
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => navigate("/dashboard/settings")}
                >
                  Settings
                </div>

                <div
                  className="dropdown-item logout"
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");

                    window.dispatchEvent(new Event("userUpdated"));

                    setUser(null);
                    navigate("/login");
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
};

  export default Header;