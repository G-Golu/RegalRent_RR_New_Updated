

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { register } from "../api/auth";
// // import "../index.css";
// import "./signup.css";


// const Signup = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.email || !form.password || !form.role) {
//       return alert("All fields required");
//     }

//     try {
//       setLoading(true);

//       const res = await register(
//         form.name,
//         form.email,
//         form.password,
//         form.role
//       );

//       if (res.message === "User registered successfully") {
//         alert("Signup successful");
//         navigate("/login");
//       } else {
//         alert(res.message || "Signup failed");
//       }

//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-box">
//         <h2 className="auth-title">Sign Up</h2>

//         <form onSubmit={handleSignup}>

//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />

//           <select
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             className="auth-select"
//           >
//             <option value="user">User</option>
//             {/* <option value="shop-admin">Shop Admin</option>
//             <option value="admin">Admin</option>
//             <option value="super-admin">Super Admin</option> */}
//           </select>

//           <button type="submit" disabled={loading}>
//             {loading ? "Creating..." : "Sign Up"}
//           </button>

//         </form>

//         <p className="auth-link">
//           Already have an account? <Link to="/login">Login</Link>
//         </p>

//       </div>
//     </div>
//   );
// };

// export default Signup;





















import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";
// import "../index.css";
import "./signup.css";


const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.role) {
      return alert("All fields required");
    }

    try {
      setLoading(true);

      const res = await register(
        form.name,
        form.email,
        form.password,
        form.role
      );

      if (res.message === "User registered successfully") {
        alert("Signup successful");
        navigate("/login");
      } else {
        alert(res.message || "Signup failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="saas-signup-page">

       
    {/* ✅ BUBBLES BACKGROUND */}
    <div className="saas-bubbles">
    {Array.from({ length: 25 }).map((_, i) => (
    <span key={i}></span>
  ))}

 </div>

      <div className="saas-signup-card">
        <h2 className="saas-title">Create Account</h2>

        <form onSubmit={handleSignup} className="saas-form">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            // className="auth-select"
          >
            <option value="user">User</option>
           
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>

        </form>

        <p className="saas-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;

