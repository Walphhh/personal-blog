import { useAuth } from "@/contexts/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Box, Input, Button } from "@chakra-ui/react";
import { useAlert } from "@/contexts/AlertContext";
import Fullscreen from "@/pages/Fullscreen";

const Login = () => {
  const Navigate = useNavigate();
  const [error, setError] = useState();
  const { setUser } = useAuth();
  const { setAlert } = useAlert();

  const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://localhost:5000/api/users/login",
        {
          username: formik.values.username,
          password: formik.values.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("login successful");
        console.log(response.data.accessToken);
        setUser({
          newUser: "admin",
          newAccessToken: response.data.accessToken,
        });
        setAlert(true, "success", "Admin Logged In");
        Navigate("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setAlert(true, "error", "Invalid Username or Password");
      }
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
    <Fullscreen>
      <Box p={8} rounded={16}>
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
              bg="bg.subtle"
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
              bg="bg.subtle"
            />
          </Field.Root>
          <Button type="submit" mt={6}>
            Login
          </Button>
        </form>
      </Box>
    </Fullscreen>
  );
};

export default Login;
