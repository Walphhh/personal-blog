import { useAuth } from "@/contexts/AuthContext";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { userState } = useAuth();
  const { user } = userState;

  return user === "admin" ? (
    <>{children}</>
  ) : (
    <>
      <Navigate to="/login" replace></Navigate>{" "}
    </>
  );
};

export default ProtectedRoutes;
