import React from "react";
import blogServices from "@/services/blogServices";
import { useAuth } from "@/contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";
import { useNavigate } from "react-router-dom";
import { HStack } from "@chakra-ui/react";
import ConfirmationDialog from "./ConfirmationDialog";

interface props {
  blogID: string;
}
const ModifyBlog = ({ blogID }: props) => {
  const { deleteBlogByID } = blogServices();
  const { userState } = useAuth();
  const { setAlert } = useAlert();
  const Navigate = useNavigate();

  const deleteBlog = async () => {
    try {
      if (blogID) {
        const isDeleted = await deleteBlogByID(blogID);
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
      <ConfirmationDialog type="edit" buttonStyle="gray" onConfirm={() => {}} />
      <ConfirmationDialog
        type="delete"
        buttonStyle="red"
        onConfirm={deleteBlog}
      />
    </HStack>
  );
};

export default ModifyBlog;
