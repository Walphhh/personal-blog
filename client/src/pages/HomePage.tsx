import BlogPreviewCard from "@/components/BlogPreviewCard";
import { VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import blogServices from "@/services/blogAPI";

export interface Blog {
  _id: string;
  title: string;
  description: string;
  body: string;
}

const HomePage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { fetchBlogs } = blogServices();

  // Fetches all the blogs from the backend
  useEffect(() => {
    const getBlogs = async () => {
      const data = await fetchBlogs();
      if (data) setBlogs(data);
    };
    getBlogs();
  }, []);

  const displayBlogs = () => {
    return blogs.map((blog) => {
      return (
        <>
          <BlogPreviewCard
            _id={blog._id}
            title={blog.title}
            description={blog.description}
          />
        </>
      );
    });
  };

  return (
    <VStack pt="10" spaceY="10">
      <VStack spaceY="2">{displayBlogs()}</VStack>
    </VStack>
  );
};

export default HomePage;
