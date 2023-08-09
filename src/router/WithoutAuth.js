import { Navigate } from "react-router-dom";
import { MISCurrentUser } from "utils/validations";

export const WithoutAuth = ({ children }) => {
  const { sessionToken } = MISCurrentUser();

  if (sessionToken) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};
