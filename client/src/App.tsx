import { RouterProvider } from "react-router-dom";
import "./App.css";
import { AlertProvider } from "./contexts/AlertContext";
import { Toaster } from "./components/ui/toaster";
import { Provider } from "./components/ui/provider";
import { AuthProvider } from "./contexts/AuthContext";
import useAxios from "./services/axiosInstance";
import routes from "./routes";
import { useEffect } from "react";

function App() {
  const router = routes();
  const axiosInstance = useAxios();

  // useEffect(()=>{
  //   const refreshUserToken = async () => {
  //     const res = await axiosInstance.post(
  //       "/refresh",
  //       {},
  //       { withCredentials: true }
  //     );

  //     if (res.status === 200) {
  //       setUser({ newAccessToken: res.data.AccessToken });
  //     }
  //   };
  //   refreshUserToken();
  // })

  return (
    <Provider enableSystem>
      <AuthProvider>
        <AlertProvider>
          <Toaster />
          <RouterProvider router={router} />
        </AlertProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
