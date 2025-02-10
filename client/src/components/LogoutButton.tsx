import React from "react";
import { Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const LogoutButton = () => {
  const { setUser } = useAuth();

  return (
    <ChakraLink>
      <Link onClick={() => setUser("viewer")} to="/">
        <Text>Logout</Text>
      </Link>
    </ChakraLink>
  );
};

export default LogoutButton;
