import { Button, Input, Field, Textarea, Box } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/contexts/AlertContext";

// The Form uses Formik to handle form submission and Yup for schema validation
const CreateBlogForm = () => {
  const Navigate = useNavigate();
  const { setAlert } = useAlert();

  // Schema for validation
  const schema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Title is too short!")
      .required("Title is required"),
    description: Yup.string()
      .min(5, "Description is too short!")
      .required("Description is required"),
    body: Yup.string()
      .min(5, "Body is too short!")
      .required("Content is required"),
  });

  // Formik handler
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      body: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/blogs",
          values
        );
        console.log(response.data);
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

  console.log(formik.touched);
  return (
    <Box p={8}>
      <Box pb={8}>
        <form onSubmit={formik.handleSubmit}>
          <Field.Root
            invalid={isValid("title")}
            onBlur={formik.handleBlur}
            pb={8}
          >
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
          <Field.Root invalid={isValid("body")}>
            <Field.Label>Body</Field.Label>
            <Textarea
              name="body"
              onChange={formik.handleChange}
              value={formik.values.body}
            />
            <Field.ErrorText>{formik.errors.body}</Field.ErrorText>
          </Field.Root>
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </Box>
  );
};

export default CreateBlogForm;
