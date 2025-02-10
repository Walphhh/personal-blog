import { ReactNode, useContext, createContext, useState } from "react";

type user = "admin" | "viewer";

type AuthContextType = {
  user: user;
  setUser: (user: user) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: "viewer",
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<user>("viewer");

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
