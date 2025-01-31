import { Blogs } from "@/SampleBlog";
import type { Blog } from "@/SampleBlog";
import { VStack, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BlogArticle = () => {
  const { blogID } = useParams();
  console.log(blogID);
  const [blog, setBlog] = useState<Blog | undefined>(undefined);

  useEffect(() => {
    const data = Blogs.find((blog) => blog.id === Number(blogID));
    console.log(data);
    setBlog(data);
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
