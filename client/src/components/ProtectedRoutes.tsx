import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const isAdmin = true;

  return isAdmin ? (
    <>{children}</>
  ) : (
    <>
      <Navigate to="/login" replace></Navigate>{" "}
    </>
  );
};

export default ProtectedRoutes;
