import { Button, Fieldset, Input, Textarea } from "@chakra-ui/react";
import { Field } from "./ui/field";
import Formik, { FormikProps } from "formik";
import Yup from "yup";

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

  const initialValues = {
    title: "",
    description: "",
    body: "",
  };

  return (
    <div>
      <Formik<BlogFormValues>
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values: BlogFormValues) => {
          console.log("Form submitted with:", values);
        }}
      >
        {({ errors, touched }: FormikProps<BlogFormValues>) => (
          <Fieldset.Root>
            <Field label="title">
              <Input name="title">
                {errors.title && touched.title ? (
                  <div>{errors.title}</div>
                ) : null}
              </Input>
            </Field>
          </Fieldset.Root>
        )}
      </Formik>
    </div>
  );

  // <Fieldset.Root>
  //   <Fieldset.Legend>Enter Blog Post Below</Fieldset.Legend>
  //   <Fieldset.Content>
  //     <Field label="Title">
  //       <Input name="title" />
  //     </Field>
  //     <Field label="Description">
  //       <Input name="description" />
  //     </Field>
  //     <Field label="Body">
  //       <Textarea name="body" />
  //     </Field>
  //   </Fieldset.Content>
  //   <Button type="submit">Submit</Button>
  // </Fieldset.Root>
};

export default CreateBlogForm;
