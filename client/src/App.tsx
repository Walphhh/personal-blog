import { RouterProvider } from "react-router-dom";
import "./App.css";
import { AlertProvider } from "./contexts/AlertContext";
import { Toaster } from "./components/ui/toaster";
import { Provider } from "./components/ui/provider";
import { AuthProvider } from "./contexts/AuthContext";
import routes from "./routes";

function App() {
  const router = routes();

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
