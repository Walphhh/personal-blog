import { VStack, Heading, Text, Button, HStack } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Blog } from "./HomePage";
import axios from "axios";
import { useAlert } from "../contexts/AlertContext";
import ConfirmationDialog from "@/components/ConfirmationDialog";

const BlogArticle = () => {
  const Navigate = useNavigate();
  const { blogID } = useParams();
  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const { setAlert } = useAlert();

  useEffect(() => {
    const fetchBlogArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blogs/${blogID}`
        );
        setBlog(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          console.log("In Client: Blog Not Found");
          setBlog({
            _id: blogID as string,
            title: "Blog Not Found",
            description: "Blog Not Found",
            body: "Blog Not Found",
          });
        }
        console.log(err);
      }
    };
    fetchBlogArticle();
  }, [blogID]);

  const deleteBlog = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${blogID}`);
      setAlert(true, "success", "Blog Deleted");
      Navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VStack>
      <Heading>{blog?.title}</Heading>
      <Text>{blog?.description}</Text>
      <Text>{blog?.body}</Text>
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
    </VStack>
  );
};

export default BlogArticle;
