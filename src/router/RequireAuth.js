import { useLocation, Navigate } from "react-router-dom";
import { MISCurrentUser } from "utils/validations";

export const RequireAuth = ({ children }) => {
  const { sessionToken } = MISCurrentUser();
  const location = useLocation();

  if (!sessionToken) {
    return <Navigate to="/app/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
};
