import {
  VStack,
  Stack,
  Heading,
  Text,
  Button,
  HStack,
  Separator,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogWithAuthorName } from "@/services/blogServices";
import { useAuth } from "@/contexts/AuthContext";
import blogServices from "@/services/blogServices";
import Fullscreen from "./Fullscreen";
import ModifyBlog from "@/components/ModifyBlog";

import EditBlogForm from "@/components/EditBlogForm";

const BlogArticle = () => {
  const { blogID } = useParams();
  const [blog, setBlog] = useState<BlogWithAuthorName>();
  const { userState } = useAuth();
  const { role } = userState;
  const { fetchBlogByID } = blogServices();
  const [isAuthor, setIsAuthor] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Something wrong here
  useEffect(() => {
    const fetchBlog = async () => {
      if (blogID !== undefined) {
        const data = await fetchBlogByID(blogID);
        setBlog(data);
        if (data !== undefined) {
          if (data.authorUserID === userState.id) {
            setIsAuthor(true);
          }
        }
        console.log(data);
      }
    };
    fetchBlog();
  }, [blogID, showEditForm]);

  return (
    <Fullscreen>
      {blog !== undefined &&
        blogID !== undefined &&
        (showEditForm ? (
          <>
            <Button onClick={() => setShowEditForm(false)}>Back</Button>
            <EditBlogForm blog={blog} blogID={blogID} />
          </>
        ) : (
          <Stack display="flex" alignItems="start">
            <Heading>{blog.title}</Heading>
            <Text>{blog.description}</Text>
            <Text>By: {blog.authorName}</Text>
            {(role === "admin" || isAuthor) && (
              <ModifyBlog
                blog={blog}
                onEditClick={() => setShowEditForm(true)}
              />
            )}

            <Separator
              orientation={{ base: "vertical", sm: "horizontal" }}
              size="lg"
              minW="100%"
            />

            <Text>
              <div dangerouslySetInnerHTML={{ __html: blog.body }} />
            </Text>
          </Stack>
        ))}
    </Fullscreen>
  );
};

export default BlogArticle;
