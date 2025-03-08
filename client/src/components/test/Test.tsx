import { useEffect, useState } from "react";
import { Text, Separator, Stack } from "@chakra-ui/react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

interface TestProps {
  setData: (data: string) => void;
}
const Test = () => {
  return (
    <Stack direction={{ base: "row", md: "column" }} align="stretch">
      <Text>First</Text>
      <Separator orientation={{ base: "vertical", sm: "horizontal" }} />
      <Text>Second</Text>
    </Stack>
  );
};

export default Test;
