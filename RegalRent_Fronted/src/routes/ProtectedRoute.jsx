import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // ❌ Not logged in
  if (!user || !token || !user.id) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role?.toLowerCase();

  // ✅ ADMIN → can access ALL pages
  if (userRole === "admin") {
    return children;
  }

  // ❌ Other users → check role
  if (role && userRole !== role.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;