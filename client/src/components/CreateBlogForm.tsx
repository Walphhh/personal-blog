import { Button, Fieldset, Input, Textarea, Box } from "@chakra-ui/react";
import { Field } from "./ui/field";
import Formik, { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "react-router-dom";
import axios from "axios";

interface BlogFormValues {
  title: string;
  description: string;
  body: string;
}

const CreateBlogForm = () => {
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

{
  /* <Fieldset.Root>
  <Fieldset.Legend>Enter Blog Post Below</Fieldset.Legend>
  <Fieldset.Content>
    <Field label="Title">
      <Input name="title" />
    </Field>
    <Field label="Description">
      <Input name="description" />
    </Field>
    <Field label="Body">
      <Textarea name="body" />
    </Field>
  </Fieldset.Content>
  <Button type="submit">Submit</Button>
</Fieldset.Root> */
}
