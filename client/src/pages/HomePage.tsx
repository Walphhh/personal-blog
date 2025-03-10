import BlogPreviewCard from "@/components/BlogPreviewCard";
import Fullscreen from "./Fullscreen";
import { VStack, Text, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import blogServices from "@/services/blogServices";
import { useAuth } from "@/contexts/AuthContext";
import { BlogWithAuthorName } from "@/services/blogServices";

const HomePage = () => {
  const [blogs, setBlogs] = useState<BlogWithAuthorName[]>([]);
  const { fetchBlogs } = blogServices();
  const { userState } = useAuth();

  // Fetches all the blogs from the backend
  useEffect(() => {
    const getBlogs = async () => {
      const data = await fetchBlogs();
      if (data) setBlogs(data);
    };
    getBlogs();
  }, []);

  return (
    <Fullscreen>
      <VStack pt="10" spaceY="10">
        {userState.role === "admin" || userState.role === "user" ? (
          <Stack bgColor="bg.subtle" rounded={16} p={2} ps={4} pe={4}>
            <Text>{`Welcome ${userState.username}`}</Text>
          </Stack>
        ) : null}

        <VStack spaceY="2">
          {blogs.map((blog) => {
            return (
              <>
                {/* Only runs if a blog exists */}
                <BlogPreviewCard key={blog._id} Blog={blog} />
              </>
            );
          })}
        </VStack>
      </VStack>
    </Fullscreen>
  );
};

export default HomePage;
