import { access } from "fs";
import { ReactNode, useContext, createContext, useState } from "react";

type userT = "admin" | "viewer";

type AuthContextType = {
  user: userT;
  accessToken: String;
  setUser: (user: userT, accessToken: "") => void;
};

const AuthContext = createContext<AuthContextType>({
  user: "viewer",
  accessToken: "",
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userState, setUserState] = useState({
    user: "viewer" as userT,
    accessToken: "",
  });

  const setUser = (newUser: userT, newAccessToken: string) => {
    setUserState({ user: newUser, accessToken: newAccessToken });
  };

  return (
    <AuthContext.Provider
      value={{
        user: userState.user,
        accessToken: userState.accessToken,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
