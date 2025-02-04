import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <Box>
      <HStack justify="space-between">
        <HStack>
          <Text>Home</Text>
          <Text>About</Text>
        </HStack>
        <HStack display="flex" justifyContent="flex-end">
          <Link to="/create-blog">{isAdmin && <Text>Add Story</Text>}</Link>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Navbar;
