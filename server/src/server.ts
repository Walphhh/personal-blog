import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes";
import userRoutes from "./routes/userRoutes";
import refreshRoute from "./routes/refreshRoute";
import https from "https";
import fs from "fs";
import path from "path";
import cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

app.use((req, res, next) => {
  // console.log("Incoming Request: ", req.method, req.path, req.headers);
  next();
});

app.use("/api/refresh", refreshRoute);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

// setting the variables
const currentEnvironment = process.env.ENV_TYPE;

const DB_URL =
  currentEnvironment === "development"
    ? (process.env.DB_URL_DEV as string)
    : (process.env.DB_URL_PROD as string); // local server momentarily, needs to be switched to an Atlas server for deployment
const port = process.env.PORT;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`Connected to ${currentEnvironment} Atlas Database`);
    startServer();
  })
  .catch((err) => {
    console.log("Connection Error: ", err);
    process.exit(1);
  });

const start_sslServer = () => {
  sslServer.listen(port, () => {
    console.log(`Secure Server running on port ${port}`);
  });
};
const startServer = () => {
  app.listen(port, () => {
    console.log(`Running ${currentEnvironment} server on port ${port}`);
  });
};

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "..", "certificate", "key.pem")),
    cert: fs.readFileSync(
      path.join(__dirname, "..", "certificate", "cert.pem")
    ),
  },
  app
);
