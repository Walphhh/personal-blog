import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogArticle from "./pages/BlogArticle";
import Layout from "./pages/Layout";
import "./App.css";
import { VStack } from "@chakra-ui/react";
import CreateBlogForm from "./components/CreateBlogForm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/blog/:blogID", element: <BlogArticle /> },
        { path: "/create-blog", element: <CreateBlogForm /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
