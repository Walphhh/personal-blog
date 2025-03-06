import { VStack, Heading, Text, Button, HStack } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogWithAuthorName } from "@/services/blogServices";
import { useAlert } from "../contexts/AlertContext";
import { useAuth } from "@/contexts/AuthContext";
import blogServices from "@/services/blogServices";
import Fullscreen from "./Fullscreen";
import ModifyBlog from "@/components/ModifyBlog";

interface props {
  passedBlog?: BlogWithAuthorName;
}
const BlogArticle = ({ passedBlog }: props) => {
  const { blogID } = useParams();
  const [blog, setBlog] = useState<BlogWithAuthorName>();
  const { userState } = useAuth();
  const { role } = userState;
  const { fetchBlogByID } = blogServices();
  const [isAuthor, setIsAuthor] = useState<boolean>(false);

  // Something wrong here
  useEffect(() => {
    const fetchBlog = async () => {
      let data: BlogWithAuthorName | undefined;
      if (!passedBlog && blogID !== undefined) {
        console.log("Fetching blog by ID");
        data = await fetchBlogByID(blogID);
        setBlog(data);
      } else {
        setBlog(passedBlog);
      }
      if (data !== undefined) {
        if (data.authorUserID === userState.id) {
          setIsAuthor(true);
        }
      }
    };
    fetchBlog();
  }, [blogID]);

  return (
    <Fullscreen>
      {blog !== undefined && blog._id !== undefined && (
        <VStack>
          <Heading>{blog.title}</Heading>
          <Text>{blog.description}</Text>
          <Text>
            <div dangerouslySetInnerHTML={{ __html: blog.body }} />
          </Text>
          {(role === "admin" || isAuthor) && <ModifyBlog blogID={blog._id} />}
        </VStack>
      )}
    </Fullscreen>
  );
};

export default BlogArticle;
