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
  const { setUser } = useAuth();
  const { setAlert } = useAlert();

  const schema = Yup.object().shape({
    email: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://localhost:5000/api/users/login",
        {
          email: formik.values.email,
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
          newID: response.data.id,
          newRole: response.data.role,
          newUsername: response.data.username,
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
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <Fullscreen>
      <Box p={8} rounded={16}>
        <form onSubmit={formik.handleSubmit}>
          <Field.Root invalid={formik.touched.email} onBlur={formik.handleBlur}>
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
            invalid={formik.touched.password}
            onBlur={formik.handleBlur}
          >
            <Field.Label>Password</Field.Label>
            <Input
              name="password"
              type="password"
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
