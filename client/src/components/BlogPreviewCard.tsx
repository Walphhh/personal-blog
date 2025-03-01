import { Card, Button } from "@chakra-ui/react";
import { BlogWithAuthorName } from "@/services/blogServices";
import { Link } from "react-router-dom";

interface props {
  Blog: BlogWithAuthorName;
}

const BlogPreviewCard = ({ Blog }: props) => {
  return (
    <Card.Root w="1080px" background="bg.panel">
      <Card.Body>
        <Card.Title>{Blog.title}</Card.Title>
        <Card.Description>{Blog.description}</Card.Description>
        <Card.Description>{`By ${Blog.authorName}`}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Link to={`/blog/${Blog._id}`}>
          <Button>View</Button>
        </Link>
      </Card.Footer>
    </Card.Root>
  );
};

export default BlogPreviewCard;
