import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import getAuthToken from "../../lib/cookies";

const ProtectectedAdmin = ({ children }) => {
  const token = getAuthToken();
  const decoded = token ? jwtDecode(token) : {};

  if (decoded && decoded.role === "admin") {
    return <>{children}</>;
  } else {
    return <Navigate to={"/login"} replace />;
  }
};

export default ProtectectedAdmin;
