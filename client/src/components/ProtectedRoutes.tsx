import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { userState } = useAuth();
  const { role } = userState;

  return role === "admin" ? (
    <>{children}</>
  ) : (
    <>
      <Navigate to="/login" replace></Navigate>{" "}
    </>
  );
};

export default ProtectedRoutes;
