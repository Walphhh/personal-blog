import { Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAlert } from "@/contexts/AlertContext";

const Logout = () => {
  const { setUser } = useAuth();
  const { setAlert } = useAlert();

  return (
    <ChakraLink>
      <Link
        onClick={() => {
          setUser({ newRole: "viewer", newAccessToken: "" }),
            setAlert(true, "success", "Logged Out Successfully");
        }}
        to="/"
      >
        <Text>Logout</Text>
      </Link>
    </ChakraLink>
  );
};

export default Logout;
