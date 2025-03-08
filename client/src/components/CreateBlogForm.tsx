import React from "react";
import BlogForm from "./BlogForm";
import { useAuth } from "@/contexts/AuthContext";
import { NewBlog } from "@/services/blogServices";
import blogServices from "@/services/blogServices";
import { useAlert } from "@/contexts/AlertContext";
import { useNavigate } from "react-router-dom";

const CreateBlogForm = () => {
  const { userState } = useAuth();
  const { postBlog } = blogServices();
  const { setAlert } = useAlert();
  const Navigate = useNavigate();

  const initialValues = {
    title: "",
    description: "",
    body: "",
    authorUserID: userState.id,
  };

  const handleSubmit = async (blogValues: NewBlog) => {
    console.log(blogValues);
    await postBlog(blogValues);
    setAlert(true, "success", "Blog Created");
    Navigate("/");
  };

  return (
    <BlogForm
      initialValues={initialValues}
      handleSubmit={handleSubmit}
    ></BlogForm>
  );
};

export default CreateBlogForm;
