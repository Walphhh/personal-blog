import { VStack, Heading, Text, Button, HStack } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Blog } from "./HomePage";
import { useAlert } from "../contexts/AlertContext";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { useAuth } from "@/contexts/AuthContext";
import blogServices from "@/services/blogAPI";

const BlogArticle = () => {
  const Navigate = useNavigate();
  const { blogID } = useParams();
  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const { setAlert } = useAlert();
  const { user } = useAuth();
  const { fetchBlogByID, deleteBlogByID } = blogServices();

  useEffect(() => {
    if (blogID) {
      const fetchBlog = async () => {
        const data = await fetchBlogByID(blogID);
        setBlog(data);
      };
      fetchBlog();
    }
  }, [blogID]);

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
    <VStack>
      <Heading>{blog?.title}</Heading>
      <Text>{blog?.description}</Text>
      <Text>{blog?.body}</Text>
      {user === "admin" && (
        <HStack>
          <ConfirmationDialog
            type="edit"
            buttonStyle="gray"
            onConfirm={() => {}}
          />
          <ConfirmationDialog
            type="delete"
            buttonStyle="red"
            onConfirm={deleteBlog}
          />
        </HStack>
      )}
    </VStack>
  );
};

export default BlogArticle;
