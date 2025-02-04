import Navbar from "@/components/Navbar";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box>
      <nav>
        <Navbar />
      </nav>

      <Box mt={10}>
        <Outlet />
      </Box>

      <footer>{/* Footer content */}</footer>
    </Box>
  );
};

export default Layout;
