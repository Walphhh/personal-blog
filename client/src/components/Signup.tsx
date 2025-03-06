import {
  Box,
  Text,
  Button,
  Field,
  VStack,
  Input,
  Center,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Fullscreen from "@/pages/Fullscreen";
import { newUser } from "@/services/userServices";
import userServices from "@/services/userServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAlert } from "@/contexts/AlertContext";

const Signup = () => {
  const { userCreate, userAuthenticate } = userServices();
  const Navigate = useNavigate();
  const { setUser } = useAuth();
  const { setAlert } = useAlert();

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
      .oneOf([Yup.ref("password")], "Passwords must match")
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
      const response = await userCreate(newUser);

      console.log(response);

      // Response 409 handler
      if (response.status === 409) {
        formik.setErrors({ email: "Email already in use" });
      }

      // Response 200 handler
      if (response.status === 200) {
        const response = await userAuthenticate(
          userDetails.email,
          userDetails.password
        );

        setUser({
          newID: response.data.id,
          newRole: response.data.role,
          newUsername: response.data.username,
          newAccessToken: response.data.accessToken,
        });
        setAlert(true, "success", "Account Created");
        Navigate("/");
      }
    } catch (err) {
      console.log("failed");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <Fullscreen>
      <Box p={8} minW={64} rounded={16} background="bg.subtle">
        <Center mb={4}>
          <Text>Sign Up</Text>
        </Center>

        <form onSubmit={formik.handleSubmit}>
          <VStack gap={0}>
            <Field.Root
              invalid={
                formik.touched.username && Boolean(formik.errors.username)
              }
              onBlur={formik.handleBlur}
              minH="5.5rem"
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
              minH="5.5rem"
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
              invalid={
                formik.touched.password && Boolean(formik.errors.password)
              }
              onBlur={formik.handleBlur}
              minH="5.5rem"
            >
              <Field.Label>Password</Field.Label>
              <Input
                name="password"
                type="password"
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
              minH="5.5rem"
            >
              <Field.Label>Confirm Password</Field.Label>
              <Input
                name="passwordConfirm"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.passwordConfirm}
                bg="bg.subtle"
              />
            </Field.Root>
            <Button type="submit">Create Account</Button>
          </VStack>
        </form>
      </Box>
    </Fullscreen>
  );
};

export default Signup;
