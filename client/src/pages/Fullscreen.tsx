import { Box, BoxProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface FullscreenProps extends BoxProps {
  children: ReactNode;
  center?: boolean;
}

const Fullscreen = ({ children, center, ...props }: FullscreenProps) => {
  const centerProps = center
    ? { display: "flex", justifyContent: "center", alignItems: "center" }
    : {};
  return (
    <Box minH="calc(100vh - 8rem)" {...centerProps} {...props}>
      {children}
    </Box>
  );
};

export default Fullscreen;
