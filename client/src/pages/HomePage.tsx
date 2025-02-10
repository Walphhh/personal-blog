import BlogPreviewCard from "@/components/BlogPreviewCard";
import { Heading, VStack, HStack, Box, Alert } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";

import { useAlert } from "../contexts/AlertContext";

export interface Blog {
  _id: string;
  title: string;
  description: string;
  body: string;
}

const HomePage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Fetches all the blogs from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
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
