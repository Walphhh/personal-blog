import { Button, Input, Textarea, Box, DialogContext } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/contexts/AlertContext";
import {} from "@chakra-ui/react";

// The Form uses Formik to handle form submission and Yup for schema validation
const CreateBlogForm = () => {
  const Navigate = useNavigate();
  const { setAlert } = useAlert();

  // Schema for validation
  const schema = Yup.object().shape({
    title: Yup.string()
      .min(1, "Title is too short!")
      .required("Title is required"),
    description: Yup.string()
      .min(1, "Description is too short!")
      .required("Description is required"),
    body: Yup.string()
      .min(1, "Body is too short!")
      .required("Content is required"),
  });

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

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Field label="Title">
          <Input
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </Field>
        <Field label="Description">
          <Input
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </Field>
        <Field label="Body">
          <Textarea
            name="body"
            onChange={formik.handleChange}
            value={formik.values.body}
          />
        </Field>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default CreateBlogForm;
