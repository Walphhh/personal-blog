import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogArticle from "./pages/BlogArticle";
import Layout from "./pages/Layout";
import "./App.css";
import { VStack } from "@chakra-ui/react";
import CreateBlogForm from "./components/CreateBlogForm";
import { ReactNode } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";

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

  return <RouterProvider router={router} />;
}

export default App;
