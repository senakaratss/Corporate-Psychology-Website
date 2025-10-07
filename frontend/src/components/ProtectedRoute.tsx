// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { data: authUser, isLoading } = useAuth();

  if (isLoading) return <p>Yükleniyor...</p>;
  if (!authUser) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
