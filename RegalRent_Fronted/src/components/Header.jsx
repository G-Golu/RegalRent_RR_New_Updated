
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Header.css";


// const Header = () => {
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   const [user, setUser] = useState(() =>
//     JSON.parse(localStorage.getItem("user")) || {}
//   );

//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // Listen for profile updates
//   useEffect(() => {
//     const handleUserUpdate = () => {
//       const updatedUser =
//         JSON.parse(localStorage.getItem("user")) || {};
//       setUser(updatedUser);
//     };

//     window.addEventListener("userUpdated", handleUserUpdate);

//     return () => {
//       window.removeEventListener("userUpdated", handleUserUpdate);
//     };
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target)
//       ) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );
//   }, []);

//   const avatarUrl =
//     user?.profile_image || "/user-icon.png";

//   return (
//     <header className="app-header">
//       <div className="header-left">
//         <span className="header-logo">
//           Admin Dashboard
//         </span>
//       </div>

//       <div className="header-center">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="header-search"
//         />
//       </div>

// <div>
//   Contact Us 
// </div>
// <div>
//   Features
// </div>
// <div>
//   Technology
// </div>
// <div>
//   our Team
// </div>
// <div>
//   about us 
// </div>
// <div>
//   Customer
// </div>
  
//         <div
//           className="profile-box"
//           ref={dropdownRef}
//           onClick={() =>
//             setDropdownOpen(!dropdownOpen)
//           }
//         >
//           <div className="header-avatar-wrapper">
//             <img
//               src={avatarUrl}
//               alt="User"
//               className="header-avatar-img"
//             />
//           </div>

//           <div className="profile-details">
//             <span className="profile-name">
//               {user?.name || "Admin User"}
//             </span>
//             <span className="profile-role">
//               {user?.role || "Administrator"}
//             </span>
//           </div>

//           <span className="profile-arrow">
//             ▾
//           </span>

//           {dropdownOpen && (
//             <div className="profile-dropdown">
//               <div
//                 className="dropdown-item"
//                 onClick={() => {
//                   navigate("/dashboard/profile");
//                   setDropdownOpen(false);
//                 }}
//               >
//                 My Profile
//               </div>

//               <div
//                 className="dropdown-item"
//                 onClick={() => {
//                   navigate("/dashboard/settings");
//                   setDropdownOpen(false);
//                 }}
//               >
//                 Settings
//               </div>

//               <div className="dropdown-divider"></div>

//               <div
//                 className="dropdown-item logout"
//                 onClick={() => {
//                   localStorage.clear();
//                   navigate("/dashboard/logout");
//                 }}
//               >
//                 Logout
//               </div>
//             </div>
//           )}
//         </div>
     
//     </header>
//   );
// };

// export default Header;








//  comment for modify today is : 14-03-2026









// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Header.css";

// const Header = () => {
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   const [user, setUser] = useState(() =>
//     JSON.parse(localStorage.getItem("user")) || {}
//   );

//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   /* ===== SCROLL FUNCTION ===== */

//  const scrollToSection = (id) => {
//   if (window.location.pathname !== "/") {
//     // Go to home first
//     navigate("/", { state: { scrollTo: id } });
//   } else {
//     // Already on home → scroll directly
//     const section = document.getElementById(id);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   }
// };

//   /* ===== USER UPDATE LISTENER ===== */

//   useEffect(() => {
//     const handleUserUpdate = () => {
//       const updatedUser =
//         JSON.parse(localStorage.getItem("user")) || {};
//       setUser(updatedUser);
//     };

//     window.addEventListener("userUpdated", handleUserUpdate);

//     return () => {
//       window.removeEventListener("userUpdated", handleUserUpdate);
//     };
//   }, []);

//   /* ===== CLOSE DROPDOWN ===== */

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target)
//       ) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () =>
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );
//   }, []);

//   const avatarUrl = user?.profile_image || "/user-icon.png";

//   return (
//     <header className="app-header">

//       {/* LEFT */}
//       <div className="header-left">
//         <span className="header-logo">Admin Dashboard</span>
//       </div>

//       {/* CENTER SEARCH */}
//       <div className="header-center">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="header-search"
//         />
//       </div>

//       {/* MENU */}
// <nav className="header-menu">


//   <button onClick={() => scrollToSection("features")}>
//     Services
//   </button>


//   <button onClick={() => scrollToSection("features")}>
//   Blocks
//   </button>

//   <button onClick={() => scrollToSection("features")}>
//     Features
//   </button>

//   <button onClick={() => scrollToSection("technology")}>
//     Technology
//   </button>

//   <button onClick={() => scrollToSection("team")}>
//     Our Team
//   </button>

//   <button onClick={() => scrollToSection("about")}>
//     About Us
//   </button>

//   <button onClick={() => scrollToSection("customer")}>
//     Customer
//   </button>

//   <button onClick={() => scrollToSection("contact")}>
//     Contact Us
//   </button>

// </nav>

//       {/* PROFILE */}
//       <div
//         className="profile-box"
//         ref={dropdownRef}
//         onClick={() => setDropdownOpen(!dropdownOpen)}
//       >
//         <div className="header-avatar-wrapper">
//           <img
//             src={avatarUrl}
//             alt="User"
//             className="header-avatar-img"
//           />
//         </div>

//         <div className="profile-details">
//           <span className="profile-name">
//             {user?.name || "Admin User"}
//           </span>

//           <span className="profile-role">
//             {user?.role || "Administrator"}
//           </span>
//         </div>

//         <span className="profile-arrow">▾</span>

//         {dropdownOpen && (
//           <div className="profile-dropdown">

//             <div
//               className="dropdown-item"
//               onClick={() => {
//                 navigate("/dashboard/profile");
//                 setDropdownOpen(false);
//               }}
//             >
//               My Profile
//             </div>

//             <div
//               className="dropdown-item"
//               onClick={() => {
//                 navigate("/dashboard/settings");
//                 setDropdownOpen(false);
//               }}
//             >
//               Settings
//             </div>

//             <div className="dropdown-divider"></div>

//             <div
//               className="dropdown-item logout"
//               onClick={() => {
//                 localStorage.clear();
//                 navigate("/dashboard/logout");
//               }}
//             >
//               Logout
//             </div>

//           </div>
//         )}
//       </div>

//     </header>
//   );
// };

//   export default Header;


// today comment for header login -- 17-03-2026














import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  /* ===== STATE ===== */
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

  /* ===== USER UPDATE LISTENER (FIXED) ===== */
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
