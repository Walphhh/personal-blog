import { Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAlert } from "@/contexts/AlertContext";
import userServices from "@/services/userServices";

const Logout = () => {
  const { setUser } = useAuth();
  const { setAlert } = useAlert();
  const { userLogout } = userServices();

  return (
    <ChakraLink>
      <Link
        onClick={() => {
          setUser({
            newID: "",
            newUsername: "",
            newRole: "viewer",
            newAccessToken: "",
          }),
            userLogout();
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
