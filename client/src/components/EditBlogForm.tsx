import BlogForm from "./BlogForm";

import { Blog, NewBlog } from "@/services/blogServices";
import blogServices from "@/services/blogServices";
import { useAlert } from "@/contexts/AlertContext";
import { useNavigate } from "react-router-dom";

interface props {
  blog: Blog;
  blogID: string;
}
const EditBlogForm = ({ blog }: props) => {
  const { updateBlog } = blogServices();
  const { setAlert } = useAlert();
  const Navigate = useNavigate();

  const initialValues = {
    title: blog.title,
    description: blog.description,
    body: blog.body,
    authorUserID: blog.authorUserID,
  };

  const handleSubmit = async (blogValues: NewBlog) => {
    const newValues: Blog = {
      ...blogValues,
      _id: blog._id,
    };
    console.log(newValues);
    await updateBlog(newValues);
    setAlert(true, "success", "Blog Updated");
    Navigate(`/blog/${blog?._id}`);
  };

  return (
    <BlogForm
      initialValues={initialValues}
      handleSubmit={handleSubmit}
    ></BlogForm>
  );
};

export default EditBlogForm;
