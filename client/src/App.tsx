import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogArticle from "./pages/BlogArticle";
import Layout from "./pages/Layout";
import "./App.css";
import CreateBlogForm from "./components/CreateBlogForm";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { AlertProvider } from "./contexts/AlertContext";
import { Toaster } from "./components/ui/toaster";
import { Provider } from "./components/ui/provider";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "blog/:blogID", element: <BlogArticle /> },
        { path: "login", element: <Login /> },
        {
          path: "create-blog",
          element: (
            <ProtectedRoutes>
              <CreateBlogForm />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);

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
