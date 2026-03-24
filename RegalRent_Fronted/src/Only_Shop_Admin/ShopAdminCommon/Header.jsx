

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Bell, ShoppingCart } from "lucide-react";
// import "./header.css";

// const Header = ({ sidebarOpen, setSidebarOpen }) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState({
//     name: "Loading...",
//     role: "Shop Admin",
//     avatar: ""
//   });

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);

//   /* ================= FETCH PROFILE ================= */
//  const fetchUser = async () => {
//   try {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const userId = storedUser?.id;

//     if (!userId) throw new Error("No userId found");

//     const res = await fetch(
//       `http://localhost:5000/api/auth/profile?userId=${userId}`
//     );

//     const data = await res.json();

//     setUser({
//       name: data.name || "Shop Admin",
//       role: data.role || "Shop Admin",
//       avatar: data.profile_image || storedUser?.avatar || ""
//     });

//   } catch (err) {
//     console.error("Fetch user error:", err);
//   }
// };

//   /* ================= LOAD CART ================= */
//   const loadCartCount = () => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const totalQuantity = cart.reduce((total, item) => total + (item.quantity || 1), 0);
//     setCartCount(totalQuantity);
//   };

//   /* ================= PROFILE UPDATE ================= */
// const handleProfileUpdate = (e) => {

//   let newImage = e?.detail;

//   // If no image passed in event, get from localStorage
//   if (!newImage) {
//     const storedUser = JSON.parse(localStorage.getItem("user")) || {};
//     newImage = storedUser.avatar || storedUser.profile_image || "";
//   }

//   if (!newImage) return;

//   setUser((prev) => ({
//     ...prev,
//     avatar: newImage
//   }));

//   // Update localStorage
//   const storedUser = JSON.parse(localStorage.getItem("user")) || {};
//   storedUser.avatar = newImage;
//   storedUser.profile_image = newImage;

//   localStorage.setItem("user", JSON.stringify(storedUser));
// };

//   useEffect(() => {
//     fetchUser();
//     loadCartCount();

//     window.addEventListener("userUpdated", handleProfileUpdate);
//     window.addEventListener("cartUpdated", loadCartCount);

//     return () => {
//       window.removeEventListener("userUpdated", handleProfileUpdate);
//       window.removeEventListener("cartUpdated", loadCartCount);
//     };
//   }, []);

//   return (
//     <header className="admin-header">
//       <div className="admin-header-left">
//         <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
//           ☰
//         </button>
//         <span className="header-title">Shop Dashboard</span>
//       </div>

//       <div className="admin-header-right">
//         {/* CART */}
//         <div className="cart-box" onClick={() => navigate("/shop-admin/cart")}>
//           <ShoppingCart size={22} />
//           {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
//         </div>

//         {/* NOTIFICATION */}
//         <div className="notification-box">
//           <Bell size={20} />
//           <span className="badge">3</span>
//         </div>

//         {/* PROFILE */}
//         <div className="profile-box" onClick={() => setDropdownOpen(!dropdownOpen)}>
//           {user.avatar ? (
//             <img src={user.avatar} alt="profile" className="profile-avatar" />
//           ) : (
//             <div className="profile-fallback">{user.name?.charAt(0)}</div>
//           )}

//           <div className="profile-info">
//             <span className="profile-name">{user.name}</span>
//             <span className="profile-role">{user.role}</span>
//           </div>

//           <span className="profile-arrow">▾</span>

//           {dropdownOpen && (
//             <div className="profile-dropdown">
//               <div
//                 className="dropdown-item"
//                 onClick={() => {
//                   navigate("/shop-admin/profile");
//                   setDropdownOpen(false);
//                 }}
//               >
//                 My Profile
//               </div>

//               <div
//                 className="dropdown-item"
//                 onClick={() => {
//                   navigate("/shop-admin/settings");
//                   setDropdownOpen(false);
//                 }}
//               >
//                 Settings
//               </div>

//               <div className="dropdown-divider"></div>

//              <div
//   className="dropdown-item logout"
//   onClick={() => {

//     // Remove login data
//     localStorage.removeItem("user");

//     // Remove cart
//     localStorage.removeItem("cart");

//     // Update UI events
//     window.dispatchEvent(new Event("cartUpdated"));
//     window.dispatchEvent(new Event("userUpdated"));

//     // Redirect to login
//     navigate("/login");

//   }}
// >
//   Logout
// </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;





// all correct comment for do real time update cart notification today : 12-03-2026


















// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Heart, ShoppingCart } from "lucide-react";
// import "./header.css";
// import { getCartApi } from "../../api/shopAdmin/shopCartApi.js";

// const Header = ({ sidebarOpen, setSidebarOpen }) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState({
//     name: "Loading...",
//     role: "Shop Admin",
//     avatar: ""
//   });

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);

//   /* ================= FETCH PROFILE ================= */

//   const fetchUser = async () => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       const userId = storedUser?.id;

//       if (!userId) throw new Error("No userId found");

//       const res = await fetch(
//         `http://localhost:5000/api/auth/profile?userId=${userId}`
//       );

//       const data = await res.json();

//       setUser({
//         name: data.name || "Shop Admin",
//         role: data.role || "Shop Admin",
//         avatar: data.profile_image || storedUser?.avatar || ""
//       });

//     } catch (err) {
//       console.error("Fetch user error:", err);
//     }
//   };

//   /* ================= LOAD CART ================= */

// const loadCartCount = async () => {
//   try {

//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const userId = storedUser?.id || 1;

//     const res = await getCartApi(userId);

//     const cart = res.data || [];

//     setCartCount(cart.length);   // ⭐ FIX

//   } catch (err) {
//     console.error("Cart load error:", err);
//   }
// };

//   /* ================= LOAD WISHLIST ================= */

//   const loadWishlistCount = () => {
//     const wishlist =
//       JSON.parse(localStorage.getItem("wishlist")) || [];

//     setWishlistCount(wishlist.length);
//   };

//   /* ================= PROFILE UPDATE ================= */

//   const handleProfileUpdate = (e) => {

//     let newImage = e?.detail;

//     if (!newImage) {
//       const storedUser = JSON.parse(localStorage.getItem("user")) || {};
//       newImage = storedUser.avatar || storedUser.profile_image || "";
//     }

//     if (!newImage) return;

//     setUser((prev) => ({
//       ...prev,
//       avatar: newImage
//     }));

//     const storedUser = JSON.parse(localStorage.getItem("user")) || {};
//     storedUser.avatar = newImage;
//     storedUser.profile_image = newImage;

//     localStorage.setItem("user", JSON.stringify(storedUser));
//   };

//   /* ================= USE EFFECT ================= */

// useEffect(() => {

//   fetchUser();
//   loadCartCount();
//   loadWishlistCount();

//   window.addEventListener("userUpdated", handleProfileUpdate);
//   window.addEventListener("cartUpdated", loadCartCount);
//   window.addEventListener("wishlistUpdated", loadWishlistCount);

//   return () => {
//     window.removeEventListener("userUpdated", handleProfileUpdate);
//     window.removeEventListener("cartUpdated", loadCartCount);
//     window.removeEventListener("wishlistUpdated", loadWishlistCount);
//   };

// }, []);

//   return (
//     <header className="admin-header">

//       <div className="admin-header-left">
//         <button
//           className="hamburger"
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//         >
//           ☰
//         </button>

//         <span className="header-title">Shop Dashboard</span>
//       </div>

//       <div className="admin-header-right">

//         {/* CART */}

//         <div
//           className="cart-box"
//           onClick={() => navigate("/shop-admin/cart")}
//         >
//           <ShoppingCart size={22} />

//         <span className="cart-badge">{cartCount}</span>
//         </div>

//         {/* WISHLIST */}

//         <div
//           className="wishlist-box"
//           onClick={() => navigate("/shop-admin/wishlist")}
//         >
//           <Heart
//     size={20}
//     fill="#ff3b5c"
//     color="#ff3b5c"
//     strokeWidth={2}
//   />
//           {wishlistCount > 0 && (
//             <span className="wishlist-badge">
//               {wishlistCount}
//             </span>
//           )}
//         </div>

//         {/* PROFILE */}

//         <div
//           className="profile-box"
//           onClick={() => setDropdownOpen(!dropdownOpen)}
//         >

//           {user.avatar ? (
//             <img
//               src={user.avatar}
//               alt="profile"
//               className="profile-avatar"
//             />
//           ) : (
//             <div className="profile-fallback">
//               {user.name?.charAt(0)}
//             </div>
//           )}

//           <div className="profile-info">
//             <span className="profile-name">{user.name}</span>
//             <span className="profile-role">{user.role}</span>
//           </div>

//           <span className="profile-arrow">▾</span>

//           {dropdownOpen && (
//             <div className="profile-dropdown">

//               <div
//                 className="dropdown-item"
//                 onClick={() => {
//                   navigate("/shop-admin/profile");
//                   setDropdownOpen(false);
//                 }}
//               >
//                 My Profile
//               </div>

//               <div
//                 className="dropdown-item"
//                 onClick={() => {
//                   navigate("/shop-admin/settings");
//                   setDropdownOpen(false);
//                 }}
//               >
//                 Settings
//               </div>

//               <div className="dropdown-divider"></div>

//               <div
//                 className="dropdown-item logout"
//                 onClick={() => {

//                   localStorage.removeItem("user");
//                   localStorage.removeItem("cart");

//                   window.dispatchEvent(new Event("cartUpdated"));
//                   window.dispatchEvent(new Event("wishlistUpdated"));
//                   window.dispatchEvent(new Event("userUpdated"));

//                   navigate("/login");
//                 }}
//               >
//                 Logout
//               </div>

//             </div>
//           )}

//         </div>

//       </div>

//     </header>
//   );
// };

// export default Header;



//  today comment for header login--17-03-2026

















// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Heart, ShoppingCart } from "lucide-react";
// import "./header.css";
// import { getCartApi } from "../../api/shopAdmin/shopCartApi.js";

// const Header = ({ sidebarOpen, setSidebarOpen }) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState({
//     name: "Loading...",
//     role: "Shop Admin",
//     avatar: ""
//   });

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);

//   /* ================= FETCH PROFILE ================= */

//   const fetchUser = async () => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       const userId = storedUser?.id;

//       if (!userId) throw new Error("No userId found");

//       const res = await fetch(
//         `http://localhost:5000/api/auth/profile?userId=${userId}`
//       );

//       const data = await res.json();

//       setUser({
//         name: data.name || "Shop Admin",
//         role: data.role || "Shop Admin",
//         avatar: data.profile_image || storedUser?.avatar || ""
//       });

//     } catch (err) {
//       console.error("Fetch user error:", err);
//     }
//   };

//   /* ================= LOAD CART ================= */

// const loadCartCount = async () => {
//   try {

//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const userId = storedUser?.id || 1;

//     const res = await getCartApi(userId);

//     const cart = res.data || [];

//     setCartCount(cart.length);   // ⭐ FIX

//   } catch (err) {
//     console.error("Cart load error:", err);
//   }
// };

//   /* ================= LOAD WISHLIST ================= */

//   const loadWishlistCount = () => {
//     const wishlist =
//       JSON.parse(localStorage.getItem("wishlist")) || [];

//     setWishlistCount(wishlist.length);
//   };

//   /* ================= PROFILE UPDATE ================= */

//   const handleProfileUpdate = (e) => {

//     let newImage = e?.detail;

//     if (!newImage) {
//       const storedUser = JSON.parse(localStorage.getItem("user")) || {};
//       newImage = storedUser.avatar || storedUser.profile_image || "";
//     }

//     if (!newImage) return;

//     setUser((prev) => ({
//       ...prev,
//       avatar: newImage
//     }));

//     const storedUser = JSON.parse(localStorage.getItem("user")) || {};
//     storedUser.avatar = newImage;
//     storedUser.profile_image = newImage;

//     localStorage.setItem("user", JSON.stringify(storedUser));
//   };

//   /* ================= USE EFFECT ================= */

// useEffect(() => {

//   fetchUser();
//   loadCartCount();
//   loadWishlistCount();

//   window.addEventListener("userUpdated", handleProfileUpdate);
//   window.addEventListener("cartUpdated", loadCartCount);
//   window.addEventListener("wishlistUpdated", loadWishlistCount);

//   return () => {
//     window.removeEventListener("userUpdated", handleProfileUpdate);
//     window.removeEventListener("cartUpdated", loadCartCount);
//     window.removeEventListener("wishlistUpdated", loadWishlistCount);
//   };

// }, []);

//   return (
//     <header className="admin-header">

//       <div className="admin-header-left">
//         <button
//           className="hamburger"
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//         >
//           ☰
//         </button>

//         <span className="header-title">Shop Dashboard</span>
//       </div>

//       <div className="admin-header-right">

//         {/* CART */}

//         <div
//           className="cart-box"
//           onClick={() => navigate("/shop-admin/cart")}
//         >
//           <ShoppingCart size={22} />

//         <span className="cart-badge">{cartCount}</span>
//         </div>

//         {/* WISHLIST */}

//         <div
//           className="wishlist-box"
//           onClick={() => navigate("/shop-admin/wishlist")}
//         >
//           <Heart
//     size={20}
//     fill="#ff3b5c"
//     color="#ff3b5c"
//     strokeWidth={2}
//   />
//           {wishlistCount > 0 && (
//             <span className="wishlist-badge">
//               {wishlistCount}
//             </span>
//           )}
//         </div>

//         {/* PROFILE */}

//         <div
//           className="profile-box"
//           onClick={() => setDropdownOpen(!dropdownOpen)}
//         >

//           {user.avatar ? (
//             <img
//               src={user.avatar}
//               alt="profile"
//               className="profile-avatar"
//             />
//           ) : (
//             <div className="profile-fallback">
//               {user.name?.charAt(0)}
//             </div>
//           )}

//           <div className="profile-info">
//             <span className="profile-name">{user.name}</span>
//             <span className="profile-role">{user.role}</span>
//           </div>

//           <span className="profile-arrow">▾</span>

//           {dropdownOpen && (
//             <div className="profile-dropdown">

//               <div
//                 className="dropdown-item"
//                 onClick={() => {
//                   navigate("/shop-admin/profile");
//                   setDropdownOpen(false);
//                 }}
//               >
//                 My Profile
//               </div>

//               <div
//                 className="dropdown-item"
//                 onClick={() => {
//                   navigate("/shop-admin/settings");
//                   setDropdownOpen(false);
//                 }}
//               >
//                 Settings
//               </div>

//               <div className="dropdown-divider"></div>

//               <div
//                 className="dropdown-item logout"
//                 onClick={() => {

//                   localStorage.removeItem("user");
//                   localStorage.removeItem("cart");

//                   window.dispatchEvent(new Event("cartUpdated"));
//                   window.dispatchEvent(new Event("wishlistUpdated"));
//                   window.dispatchEvent(new Event("userUpdated"));

//                   navigate("/login");
//                 }}
//               >
//                 Logout
//               </div>

//             </div>
//           )}

//         </div>

//       </div>

//     </header>
//   );
// };

// export default Header;



// comment for again modify cart -- 17-03-2026













import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import "./header.css";
import { getCartApi } from "../../api/shopAdmin/shopCartApi.js";

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

setCartCount(totalQty); // ⭐ FIX

  } catch (err) {
    console.error("Cart load error:", err);
  }
};

  /* ================= LOAD WISHLIST ================= */

  const loadWishlistCount = () => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlistCount(wishlist.length);
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

  window.addEventListener("userUpdated", handleProfileUpdate);
  window.addEventListener("cartUpdated", loadCartCount);
  window.addEventListener("wishlistUpdated", loadWishlistCount);

  return () => {
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
          <Heart
    size={20}
    fill="#ff3b5c"
    color="#ff3b5c"
    strokeWidth={2}
  />
          {wishlistCount > 0 && (
            <span className="wishlist-badge">
              {wishlistCount}
            </span>
          )}
        </div>

        {/* PROFILE */}

        <div
          className="profile-box"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >

          {user.avatar ? (
            <img
              src={user.avatar}
              alt="profile"
              className="profile-avatar"
            />
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

              <div
                className="dropdown-item"
                onClick={() => {
                  navigate("/shop-admin/profile");
                  setDropdownOpen(false);
                }}
              >
                My Profile
              </div>

              <div
                className="dropdown-item"
                onClick={() => {
                  navigate("/shop-admin/settings");
                  setDropdownOpen(false);
                }}
              >
                Settings
              </div>

              <div className="dropdown-divider"></div>

              <div
                className="dropdown-item logout"
                onClick={() => {

                  localStorage.removeItem("user");
                  localStorage.removeItem("cart");

                  window.dispatchEvent(new Event("cartUpdated"));
                  window.dispatchEvent(new Event("wishlistUpdated"));
                  window.dispatchEvent(new Event("userUpdated"));

                  navigate("/login");
                }}
              >
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


// comment for again modify cart -- 17-03-2026

