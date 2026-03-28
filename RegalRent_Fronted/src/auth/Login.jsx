

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


      // today 27-03-2026  added for token save , shop user notification ===========


      // ✅ STORE TOKEN (EXACT PLACE)  
localStorage.setItem("token", res.token);

// ✅ DEBUG (optional but important)
console.log("Stored Token:", localStorage.getItem("token"));


      // today 27-03-2026  added for token save , shop user notification ===========

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
        // localStorage.setItem("token", res.token); 27-03-2026 , commentd

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