import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogArticle from "./pages/BlogArticle";
import Layout from "./pages/Layout";
import "./App.css";
import CreateBlogForm from "./components/CreateBlogForm";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { AlertProvider } from "./contexts/AlertContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/blog/:blogID", element: <BlogArticle /> },
        {
          path: "/create-blog",
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
    <AlertProvider>
      <RouterProvider router={router} />
    </AlertProvider>
  );
}

export default App;
