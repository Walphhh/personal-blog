import Navbar from "@/components/Navbar";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box>
      <nav>
        <Navbar />
      </nav>
      <Box background="bg.muted" p={8}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
