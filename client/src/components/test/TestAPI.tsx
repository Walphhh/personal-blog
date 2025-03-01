import { Button } from "@chakra-ui/react";
import userServices from "@/services/userServices";
import blogServices from "@/services/blogServices";

const TestAPI = () => {
  const { fetchUsername } = userServices();
  const { fetchBlogByID } = blogServices();

  const handleOnClick = async () => {
    const blog = await fetchBlogByID("67bf0a269f4d936bf5500add");
    if (blog?.authorUserID) {
      const authorID = blog.authorUserID;

      const username = await fetchUsername(authorID);
      alert(`Username is: ${username}`);
    }
  };
  return <Button onClick={handleOnClick}>Test</Button>;
};

export default TestAPI;
