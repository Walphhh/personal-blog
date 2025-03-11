import { createHashRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogArticle from "./pages/BlogArticle";
import Layout from "./pages/Layout";
import CreateBlogForm from "./components/CreateBlogForm";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./components/Login";
import Signup from "./components/Signup";

const routes = () => {
  return createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
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
};

export const useRouter = () => {
  return routes();
};

export default routes;
