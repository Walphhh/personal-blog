import { Box, BoxProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface FullscreenProps extends BoxProps {
  children: ReactNode;
}

const Fullscreen = ({ children, ...props }: FullscreenProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="calc(100vh - 4rem)"
      {...props}
    >
      {children}
    </Box>
  );
};

export default Fullscreen;
