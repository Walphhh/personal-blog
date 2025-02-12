import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes";
import userRoutes from "./routes/userRoutes";
import refreshRoute from "./routes/refreshRoute";

import cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api", refreshRoute);

// Always add IP and PORT
const DB = "mongodb://127.0.0.1:27017/personal-blog";

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to Database");
    startServer();
  })
  .catch((err) => {
    console.log("Connection Error: ", err);
    process.exit(1);
  });

const startServer = () => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};
