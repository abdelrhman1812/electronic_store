import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import getAuthToken from "../../lib/cookies";

const ProtectedRoute = ({ children }) => {
  const token = getAuthToken();
  const decoded = token ? jwtDecode(token) : {};
  console.log(decoded);
  if (token && decoded.role !== "admin") {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default ProtectedRoute;
