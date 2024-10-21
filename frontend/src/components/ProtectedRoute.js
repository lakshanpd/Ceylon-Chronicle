import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
