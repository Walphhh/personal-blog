import React from "react";
import blogServices from "@/services/blogServices";
import { useAuth } from "@/contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";
import { useNavigate } from "react-router-dom";
import { Button, HStack } from "@chakra-ui/react";
import ConfirmationDialog from "./ConfirmationDialog";
import BlogForm from "./BlogForm";
import { Blog } from "@/services/blogServices";

interface props {
  blog: Blog;
  onEditClick: () => void;
}
const ModifyBlog = ({ blog, onEditClick }: props) => {
  const { deleteBlogByID } = blogServices();
  const { setAlert } = useAlert();
  const Navigate = useNavigate();

  const deleteBlog = async () => {
    try {
      if (blog._id) {
        const isDeleted = await deleteBlogByID(blog._id);
        if (isDeleted) {
          setAlert(true, "success", "Blog Deleted");
          Navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <HStack>
      <Button onClick={onEditClick}>Edit</Button>
      <ConfirmationDialog
        type="delete"
        buttonStyle="red"
        onConfirm={deleteBlog}
      />
    </HStack>
  );
};

export default ModifyBlog;
