import { Box, Text, Button, Field, Input, Center } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Fullscreen from "@/pages/Fullscreen";
import { newUser } from "@/services/userServices";
import userServices from "@/services/userServices";

const Signup = () => {
  const { createUser } = userServices();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Passwords must match"),
  });

  const handleSubmit = async (userDetails: any) => {
    try {
      const newUser: newUser = {
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password,
      };
      console.log(newUser);
      const response = await createUser(newUser);
      if (response !== true) console.log(response.data);
      alert(`Submitting with values: ${newUser}`);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <Fullscreen>
      <Box p={8} rounded={16} background="bg.subtle">
        <Center>
          <Text>Sign Up</Text>
        </Center>

        <form onSubmit={formik.handleSubmit}>
          <Field.Root
            invalid={formik.touched.username && Boolean(formik.errors.username)}
            onBlur={formik.handleBlur}
          >
            <Field.Label>Username</Field.Label>
            <Input
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              bg="bg.subtle"
            />
            <Field.ErrorText>{formik.errors.username}</Field.ErrorText>
          </Field.Root>
          <Field.Root
            invalid={formik.touched.email && Boolean(formik.errors.email)}
            onBlur={formik.handleBlur}
          >
            <Field.Label>Email</Field.Label>
            <Input
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              bg="bg.subtle"
            />
            <Field.ErrorText>{formik.errors.email}</Field.ErrorText>
          </Field.Root>
          <Field.Root
            invalid={formik.touched.password && Boolean(formik.errors.password)}
            onBlur={formik.handleBlur}
          >
            <Field.Label>Password</Field.Label>
            <Input
              name="password"
              //type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              bg="bg.subtle"
            />
            <Field.ErrorText>{formik.errors.password}</Field.ErrorText>
          </Field.Root>
          <Field.Root
            invalid={
              formik.touched.passwordConfirm &&
              Boolean(formik.errors.passwordConfirm)
            }
            onBlur={formik.handleBlur}
          >
            <Field.Label>Confirm Password</Field.Label>
            <Input
              name="passwordConfirm"
              //type="password"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
              bg="bg.subtle"
            />
          </Field.Root>
          <Button type="submit" mt={6}>
            Create Account
          </Button>
        </form>
      </Box>
    </Fullscreen>
  );
};

export default Signup;
