import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Blog } from "./HomePage";
import axios from "axios";
import { useAlert } from "../contexts/AlertContext";

const BlogArticle = () => {
  const Navigate = useNavigate();
  const { blogID } = useParams();
  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const { showAlert, setAlert } = useAlert();

  useEffect(() => {
    const fetchBlogArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blogs/${blogID}`
        );
        setBlog(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogArticle();
  }, [blogID]);

  const deleteBlog = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${blogID}`);
      setAlert(!showAlert, "success", "Blog Deleted");
      Navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VStack>
      <Heading>Blog {blog?.title}</Heading>
      <Text>Blog {blog?.description}</Text>
      <Text>Blog {blog?.body}</Text>
      <Button onClick={deleteBlog}>Delete Blog</Button>
    </VStack>
  );
};

export default BlogArticle;
