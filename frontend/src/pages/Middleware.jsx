import { Navigate } from "react-router-dom";

const AuthMiddleware = ({ children }) => {
  const token = localStorage.getItem("token"); 

  if (!token) {
   
    return <Navigate to="/registr/login" replace />;
  }

  
  return children;
};

export default AuthMiddleware;