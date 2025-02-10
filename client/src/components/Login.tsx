import { useAuth } from "@/contexts/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Field, Box, Input, Button } from "@chakra-ui/react";
import { useAlert } from "@/contexts/AlertContext";

const Login = () => {
  const Navigate = useNavigate();
  const { setUser } = useAuth();
  const { setAlert } = useAlert();

  const schema = Yup.object().shape({
    username: Yup.string().required("User is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async () => {
    console.log(formik.values);
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username: formik.values.username,
        password: formik.values.password,
      });
      if (response.status === 200) {
        console.log("login successful");
        setUser("admin");
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
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Field.Root>
          <Field.Label>Username</Field.Label>

          <Input
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </Field.Root>
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default Login;
