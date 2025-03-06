import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { userState } = useAuth();
  const { role } = userState;

  return role === "admin" || role === "user" ? (
    <>{children}</>
  ) : (
    <>
      <Navigate to="/user/login" replace></Navigate>{" "}
    </>
  );
};

export default ProtectedRoutes;
