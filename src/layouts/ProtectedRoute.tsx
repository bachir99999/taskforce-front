import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { JSX, useEffect } from "react";
import { handleSavedToken } from "../lib/api/auth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token, logout } = useAuth();

  useEffect(() => {
    async function verify() {
      await handleSavedToken(token, logout);
    }
    verify();
  }, [token, logout]);

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
