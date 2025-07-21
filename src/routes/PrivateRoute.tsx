import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/ingreso" replace />;
}
