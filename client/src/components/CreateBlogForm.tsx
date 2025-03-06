import { Button, Input, Field, Textarea, Box, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/contexts/AlertContext";
import blogServices from "@/services/blogServices";
import { Blog } from "@/services/blogServices";
import { useAuth } from "@/contexts/AuthContext";
import TextEditor from "./TextEditor";
import { useState } from "react";

// The Form uses Formik to handle form submission and Yup for schema validation
const CreateBlogForm = () => {
  const Navigate = useNavigate();
  const [body, setBody] = useState("");
  const { setAlert } = useAlert();
  const { postBlog } = blogServices();
  const { userState } = useAuth();

  // Schema for validation
  const schema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Title is too short!")
      .required("Title is required"),
    description: Yup.string()
      .min(5, "Description is too short!")
      .required("Description is required"),
  });

  // Formik handler
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: async (values) => {
      try {
        const newValues: Blog = {
          ...values,
          body: body,
          authorUserID: userState.id,
        };
        await postBlog(newValues);
        setAlert(true, "success", "Blog Created");
        Navigate("/");
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: schema,
  });

  const isValid = (fieldName: keyof typeof formik.values) => {
    return formik.touched[fieldName] && Boolean(formik.errors[fieldName]);
  };

  const handleContentData = (content: string) => {
    setBody(content);
    console.log(content);
  };
  return (
    <Box p={8}>
      <form onSubmit={formik.handleSubmit}>
        <Box pb={8}>
          <Field.Root invalid={isValid("title")} onBlur={formik.handleBlur}>
            <Field.Label>Title</Field.Label>
            <Input
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <Field.ErrorText>{formik.errors.title}</Field.ErrorText>
          </Field.Root>
          <Field.Root
            invalid={isValid("description")}
            onBlur={formik.handleBlur}
          >
            <Field.Label>Description</Field.Label>
            <Input
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            <Field.ErrorText>{formik.errors.description}</Field.ErrorText>
          </Field.Root>
          <Field.Root mb={1}>
            <Field.Label>Body</Field.Label>
          </Field.Root>
          <TextEditor setData={handleContentData} />
        </Box>

        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default CreateBlogForm;
