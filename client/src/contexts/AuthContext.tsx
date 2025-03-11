import { baseURL as mainURL } from "@/services/axiosInstance";
import axios from "axios";
import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";

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
  const baseURL = mainURL;

  // Checks if a user was previously logged in and reauthenticates user
  useEffect(() => {
    if (userState.id === "") {
      const refreshUser = async () => {
        try {
          const res = await axios.post(
            `${baseURL}/refresh/user`,
            {},
            { withCredentials: true }
          );
          if (res.status === 401) return;
          if (res.status === 200) {
            setUser({
              newID: res.data.id,
              newUsername: res.data.username,
              newRole: res.data.role,
            });
          }
        } catch (err) {
          if (axios.isAxiosError(err) && err.status === 401) {
            return;
          }
          console.log(err);
        }
      };
      refreshUser();
    }
  }, []);

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
