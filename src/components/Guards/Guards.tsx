import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute = () => {
  const { isLoggedIn, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (user?.isVerified && location.pathname === "/verify-email") {
    return <Navigate to="/dashboard" replace />;
  }

  if (user && !user.isVerified && location.pathname !== "/verify-email") {
    return <Navigate to="/verify-email" replace />;
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const { isLoggedIn, user, isLoading } = useAuth();

  if (isLoading) return null;

  if (isLoggedIn && user?.isVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
