import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogArticle from "./pages/BlogArticle";
import Layout from "./pages/Layout";
import CreateBlogForm from "./components/CreateBlogForm";
import ProtectedRoutes from "./components/ProtectedRoutes";
import TestAPI from "./components/test/TestAPI";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

import { AlertProvider } from "./contexts/AlertContext";
import { Toaster } from "./components/ui/toaster";
import { Provider } from "./components/ui/provider";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/test", element: <TestAPI /> },
        {
          path: "blog",
          children: [
            {
              path: ":blogID",
              element: <BlogArticle />,
            },
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
        {
          path: "user",
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "sign-up",
              element: <Signup />,
            },
          ],
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
