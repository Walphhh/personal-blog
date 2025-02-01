import { VStack, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Blog } from "./HomePage";
import axios from "axios";

const BlogArticle = () => {
  const { blogID } = useParams();

  console.log(blogID);

  const [blog, setBlog] = useState<Blog | undefined>(undefined);

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

  return (
    <VStack>
      <Heading>Blog {blog?.title}</Heading>
      <Text>Blog {blog?.description}</Text>
      <Text>Blog {blog?.body}</Text>
    </VStack>
  );
};

export default BlogArticle;
