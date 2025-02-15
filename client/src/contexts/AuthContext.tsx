import axios from "axios";
import { access } from "fs";
import { ReactNode, useContext, createContext, useState } from "react";
import useAxios from "../services/axiosInstance";

type userType = "admin" | "viewer";
type accessTokenType = string;

type UserStateType = {
  user: userType;
  accessToken: accessTokenType;
};

type setUserParams = {
  newUser?: userType;
  newAccessToken?: accessTokenType;
};

type AuthContextType = {
  userState: UserStateType;
  setUser: (params: setUserParams) => void;
};

const AuthContext = createContext<AuthContextType>({
  userState: {
    user: "viewer",
    accessToken: "",
  },
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userState, setUserState] = useState<UserStateType>({
    user: "viewer", // default user
    accessToken: "", // default token
  });

  const setUser = ({ newUser, newAccessToken }: setUserParams = {}) => {
    setUserState((prev) => ({
      user: newUser ? newUser : prev.user,
      accessToken: newAccessToken ? newAccessToken : prev.accessToken,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        userState,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
