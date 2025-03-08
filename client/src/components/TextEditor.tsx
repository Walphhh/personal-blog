import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

interface TestProps {
  setData: (data: string) => void;
  initialContent: string;
}
const Test = ({ setData, initialContent }: TestProps) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    const post = () => {
      const cleanPost = DOMPurify.sanitize(content);
      setData(cleanPost);
    };
    post();
  }, [content]);

  return (
    <div>
      <ReactQuill theme="snow" value={content} onChange={setContent} />
    </div>
  );
};

export default Test;
