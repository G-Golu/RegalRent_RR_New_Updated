import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/passwordApi";
import "./forgetpassword.css";

const ForgotPasswordPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success or error
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setMessage("");

    const res = await forgotPassword(email);

    setLoading(false);

    if (res.success === false) {
      setType("error");
    } else {
      setType("success");
    }

    setMessage(res.message);

    // redirect after success
    if (res.success !== false) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }

  };

  return (

    <div className="forgot-container">

      <div className="forgot-card">

        <h2 className="forgot-title">Forgot Password</h2>

        <p className="forgot-subtitle">
          Enter your email to receive a password reset link
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            className="forgot-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="forgot-btn"
            disabled={loading}
          >

            {loading ? (
              <span className="spinner"></span>
            ) : (
              "Send Reset Link"
            )}

          </button>

        </form>

        {message && (
          <p className={`forgot-message ${type}`}>
            {message}
          </p>
        )}

      </div>

    </div>

  );

};

export default ForgotPasswordPage;