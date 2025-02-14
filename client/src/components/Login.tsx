import { useAuth } from "@/contexts/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Field, Box, Input, Button, Flex } from "@chakra-ui/react";
import { useAlert } from "@/contexts/AlertContext";

const Login = () => {
  const Navigate = useNavigate();
  const { setUser } = useAuth();
  const { setAlert } = useAlert();

  const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async () => {
    console.log(formik.values);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          username: formik.values.username,
          password: formik.values.password,
        }
      );
      if (response.status === 200) {
        console.log("login successful");
        console.log(response.data.accessToken);
        setUser("admin", response.data.accessToken);
        setAlert(true, "success", "Admin Logged In");
        Navigate("/");
      } else console.log("No response from server");
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="calc(100vh - 4rem)"
    >
      <Box bg="pink.200" p={8} rounded={16}>
        <form onSubmit={formik.handleSubmit}>
          <Field.Root
            invalid={formik.touched.username}
            onBlur={formik.handleBlur}
          >
            <Field.Label>Username</Field.Label>
            <Input
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <Field.ErrorText>{formik.errors.username}</Field.ErrorText>
          </Field.Root>
          <Field.Root
            invalid={formik.touched.password}
            onBlur={formik.handleBlur}
          >
            <Field.Label>Password</Field.Label>
            <Input
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Field.Root>
          <Button type="submit" mt={6}>
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
