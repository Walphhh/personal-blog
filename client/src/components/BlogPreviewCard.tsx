import { Card, Button } from "@chakra-ui/react";
import { Blog } from "../pages/HomePage";
import { Link } from "react-router-dom";

const BlogPreviewCard = ({
  _id,
  title,
  description,
}: Pick<Blog, "_id" | "title" | "description">) => {
  return (
    <Card.Root w="1080px" background="bg.panel">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Link to={`/blog/${_id}`}>
          <Button>View</Button>
        </Link>
      </Card.Footer>
    </Card.Root>
  );
};

export default BlogPreviewCard;
