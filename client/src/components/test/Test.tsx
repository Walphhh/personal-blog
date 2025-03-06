import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

interface TestProps {
  setData: (data: string) => void;
}
const Test = ({ setData }: TestProps) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const post = () => {
      setData(content);
    };
    post();
  }, [content]);

  const cleanPost = DOMPurify.sanitize(content);
  return (
    <div>
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <div dangerouslySetInnerHTML={{ __html: cleanPost }} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {cleanPost}
    </div>
  );
};

export default Test;
