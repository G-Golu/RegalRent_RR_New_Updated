

// // src/pages/Login.jsx
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { login } from "../api/auth";

// const Login = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     role: "admin",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await login(form.email, form.password);

//       if (res?.user) {

//         // Role match check
//         if (res.user.role !== form.role) {
//           alert("Selected role does not match this account");
//           return;
//         }

//         //  IMPORTANT: Preserve old profile image if exists
//         const existingUser = JSON.parse(localStorage.getItem("user")) || {};

//         const updatedUser = {
//           ...res.user,
//           profile_image:
//             res.user.profile_image || existingUser.profile_image || "",
//         };

//         localStorage.setItem("user", JSON.stringify(updatedUser));

//         // Navigation
//         if (form.role === "admin") {
//           navigate("/dashboard/available-modules");
//         } 
//         else if (form.role === "shop-admin") {
//           navigate("/shop-admin/admin-products");
//         } 
//         else if (form.role === "user") {
//           navigate("/dashboard/user");
//         }

//       } else {
//         alert("Invalid email or password");
//       }

//     } catch (error) {
//       console.error(error);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <h2>Login</h2>

//         <form onSubmit={handleLogin} className="login-form">

//           <select
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//           >
//             <option value="admin">Admin</option>
//             <option value="shop-admin">Shop Admin</option>
//             <option value="user">User</option>
//           </select>

//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Enter Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />

//           <button type="submit">Login</button>
//         </form>

//         {/* ✅ Signup Link Added */}
//         <p style={{ marginTop: "15px" }}>
//           Don’t have an account?{" "}
//           <Link to="/signup">Sign Up</Link>
//         </p>

//       </div>
//     </div>
//   );
// };

// export default Login;


// currently use this all good
  


// comment for expired can't do login , today is 09-03-2026































// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { login } from "../api/auth";

// const Login = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     role: "admin",
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle login
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await login(form.email, form.password);

//       // If backend returns a user object
//       if (res?.user) {
//         // Role mismatch check
//         if (res.user.role !== form.role) {
//           alert("Selected role does not match this account");
//           return;
//         }

//         // Preserve old profile image if exists
//         const existingUser = JSON.parse(localStorage.getItem("user")) || {};
//         const updatedUser = {
//           ...res.user,
//           profile_image: res.user.profile_image || existingUser.profile_image || "",
//         };

//         localStorage.setItem("user", JSON.stringify(updatedUser));

//         // Navigate and show success alert
//         if (form.role === "admin") {
//           alert("Welcome to Admin Page!");
//           navigate("/dashboard");
//         } else if (form.role === "shop-admin") {
//           alert("Welcome to Shop-Admin Page!");
//           navigate("/shop-admin/admin-products");
//         } else if (form.role === "user") {
//           alert("Welcome to User Page!");
//           navigate("/dashboard/user");
//         }
//       } else if (res?.message) {
//         // Backend sends a message (like inactive user)
//         alert(res.message);
//       }
//     } catch (error) {
//       console.error("LOGIN ERROR:", error);

//       // Handle fetch errors (network/server issues)
//       if (error.message) {
//         alert(error.message);
//       } else {
//         alert("Server error. Please try again later.");
//       }
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <h2>Login</h2>

//         <form onSubmit={handleLogin} className="login-form">
//           <select name="role" value={form.role} onChange={handleChange}>
//             <option value="admin">Admin</option>
//             <option value="shop-admin">Shop Admin</option>
//             <option value="user">User</option>
//           </select>

//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Enter Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />

//           <button type="submit">Login</button>
//         </form>

//         <p style={{ marginTop: "15px" }}>
//           Don’t have an account? <Link to="/signup">Sign Up</Link>
//         </p>
//         <br/>
//          <p style={{ marginTop: "15px" }}>
//          <Link to="/forgot-password">Forget Password ?</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// comment for again generate token today is : 17-03-2026











import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login(form.email, form.password);

      console.log("LOGIN RESPONSE:", res); // 🔍 DEBUG

      // ✅ If backend returns user
      if (res?.user) {

        // ❌ Role mismatch
        if (res.user.role !== form.role) {
          alert("Selected role does not match this account");
          return;
        }

        // Preserve profile image
        const existingUser =
          JSON.parse(localStorage.getItem("user")) || {};

        const updatedUser = {
          ...res.user,
          profile_image:
            res.user.profile_image ||
            existingUser.profile_image ||
            "",
        };

        // ✅ Store user
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // 🔥 IMPORTANT: store token
        localStorage.setItem("token", res.token);

        // ✅ Notify UI (Header update)
        window.dispatchEvent(new Event("userUpdated"));

        // ✅ Navigate
        if (form.role === "admin") {
          alert("Welcome to Admin Page!");
          navigate("/dashboard");
        } else if (form.role === "shop-admin") {
          alert("Welcome to Shop-Admin Page!");
          navigate("/shop-admin/admin-products");
        } else if (form.role === "user") {
          alert("Welcome to User Page!");
          navigate("/dashboard/user");
        }

      } else if (res?.message) {
        alert(res.message);
      }

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      if (error.message) {
        alert(error.message);
      } else {
        alert("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin} className="login-form">

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="shop-admin">Shop Admin</option>
            <option value="user">User</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

        </form>

        <p style={{ marginTop: "15px" }}>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <br />

        <p>
          <Link to="/forgot-password">Forget Password ?</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;