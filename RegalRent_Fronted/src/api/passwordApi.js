const API_URL = "http://localhost:5000/api/password";

/* ================= FORGOT PASSWORD ================= */

export const forgotPassword = async (email) => {

  try {

    const response = await fetch(`${API_URL}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send reset link");
    }

    return data;

  } catch (error) {

    console.error("Forgot Password Error:", error);

    return {
      success: false,
      message: error.message || "Server error"
    };

  }

};


/* ================= RESET PASSWORD ================= */

export const resetPassword = async (token, password) => {

  try {

    const response = await fetch(`${API_URL}/reset-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Password reset failed");
    }

    return data;

  } catch (error) {

    console.error("Reset Password Error:", error);

    return {
      success: false,
      message: error.message || "Server error"
    };

  }

};