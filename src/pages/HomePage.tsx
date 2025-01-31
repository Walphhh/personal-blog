import BlogPreviewCard from "@/components/BlogPreviewCard";
import { Heading, VStack, HStack, Box } from "@chakra-ui/react";
import { Blogs } from "@/SampleBlog";

const HomePage = () => {
  const displayBlogs = () => {
    return Blogs.map((blog) => {
      return (
        <BlogPreviewCard
          id={blog.id}
          title={blog.title}
          description={blog.description}
        />
      );
    });
  };

  return (
    <VStack spaceY="10" mt={10}>
      <VStack spaceY="2">{displayBlogs()}</VStack>
    </VStack>
  );
};

export default HomePage;
