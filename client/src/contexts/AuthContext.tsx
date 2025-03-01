import { ReactNode, useContext, createContext, useState } from "react";

type roleType = "admin" | "user" | "viewer";
type accessTokenType = string;

export type UserStateType = {
  id: string;
  username: string;
  role: roleType;
  accessToken: accessTokenType;
};

type setUserParams = {
  newID?: string;
  newUsername?: string;
  newRole?: roleType;
  newAccessToken?: accessTokenType;
};

type AuthContextType = {
  userState: UserStateType;
  setUser: (params: setUserParams) => void;
};

const AuthContext = createContext<AuthContextType>({
  userState: {
    id: "",
    username: "",
    role: "viewer",
    accessToken: "",
  },
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userState, setUserState] = useState<UserStateType>({
    id: "",
    username: "",
    role: "viewer", // default role
    accessToken: "", // default token
  });

  const setUser = ({
    newID,
    newUsername,
    newRole,
    newAccessToken,
  }: setUserParams = {}) => {
    setUserState((prev) => ({
      id: newID ? newID : prev.id,
      username: newUsername ? newUsername : prev.username,
      role: newRole ? newRole : prev.role,
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
