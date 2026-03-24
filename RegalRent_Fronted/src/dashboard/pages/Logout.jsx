import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="logout-wrapper">
      <div className="logout-container">
        <h2>Confirm Logout</h2>
        <p>
          You are about to sign out from your account.  
          Do you want to continue?
        </p>

        <div className="logout-buttons">
          <button
            className="btn-secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

          <button
            className="btn-primary"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
