import { useAuth } from "@/contexts/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Text,
  Center,
  Field,
  Box,
  Input,
  Button,
  VStack,
  Link as ChakraLink,
  Stack,
  Separator,
} from "@chakra-ui/react";
import { useAlert } from "@/contexts/AlertContext";
import Fullscreen from "@/pages/Fullscreen";
import userServices from "@/services/userServices";

const Login = () => {
  const Navigate = useNavigate();
  const { setUser } = useAuth();
  const { setAlert } = useAlert();
  const { userAuthenticate } = userServices();

  const schema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async () => {
    const response = await userAuthenticate(
      formik.values.email,
      formik.values.password
    );

    if (response.status === 200) {
      setUser({
        newID: response.data.id,
        newRole: response.data.role,
        newUsername: response.data.username,
        newAccessToken: response.data.accessToken,
      });
      setAlert(true, "success", "Admin Logged In");
      Navigate("/");
    }

    if (axios.isAxiosError(response) && response.status === 401) {
      setAlert(true, "error", "Invalid Username or Password");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <Fullscreen center={true}>
      <Box p={8} minW={64} rounded={16} background="bg.subtle">
        <Center mb={4}>
          <Text>Login</Text>
        </Center>

        <VStack>
          <form onSubmit={formik.handleSubmit}>
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
            <Button type="submit" w="full">
              Login
            </Button>
          </form>
          <Stack>
            <Separator size="lg" orientation="horizontal" />
          </Stack>

          <VStack>
            <Text> No Account?</Text>
            <ChakraLink>
              <Link to="/user/sign-up">
                <Text textEmphasis="ActiveBorder">Ceate One</Text>
              </Link>
            </ChakraLink>
          </VStack>
        </VStack>
      </Box>
    </Fullscreen>
  );
};

export default Login;
