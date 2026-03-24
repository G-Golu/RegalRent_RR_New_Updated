import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");

    navigate("/login");
    alert("Successfully Logout !")
  }, [navigate]);

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Logging out...</h2>
    </div>
  );
};

export default UserLogout;