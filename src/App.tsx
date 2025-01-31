import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogArticle from "./pages/BlogArticle";
import Layout from "./pages/Layout";
import "./App.css";
import { VStack } from "@chakra-ui/react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/blog/:blogID", element: <BlogArticle /> },
      ],
    },
  ]);

  return (
    <VStack>
      <RouterProvider router={router} />
    </VStack>
  );
}

export default App;
