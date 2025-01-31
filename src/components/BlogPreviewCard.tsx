import { Card, Button } from "@chakra-ui/react";
import type { Blog } from "@/SampleBlog";
import { Link } from "react-router-dom";

const BlogPreviewCard = ({
  id,
  title,
  description,
}: Pick<Blog, "id" | "title" | "description">) => {
  return (
    <Card.Root w="1080px">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Link to={`/blog/${id}`}>
          <Button>View</Button>
        </Link>
      </Card.Footer>
    </Card.Root>
  );
};

export default BlogPreviewCard;
