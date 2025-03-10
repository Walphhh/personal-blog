import { Box, HStack, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useAuth } from "@/contexts/AuthContext";
import Logout from "./Logout";
const Navbar = () => {
  const { userState } = useAuth();

  return (
    <Box p={5} border="emphasized" background="bg.subtle" h={16}>
      <HStack justify="space-between">
        <HStack ms={6} spaceX={8}>
          <ChakraLink asChild>
            <Link to="/">
              <Text>Home</Text>
            </Link>
          </ChakraLink>
          <Text>About</Text>
        </HStack>
        <HStack display="flex" justifyContent="flex-end" me={6}>
          {userState.role === "admin" || userState.role === "user" ? (
            <>
              <Logout />
              <Link to="/blog/create-blog">
                <IoMdAddCircleOutline size="2rem" />
              </Link>
            </>
          ) : (
            <ChakraLink>
              <Link to="/user/login">
                <Text>Login</Text>
              </Link>
            </ChakraLink>
          )}
        </HStack>
      </HStack>
    </Box>
  );
};

export default Navbar;
