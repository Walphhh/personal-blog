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

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://localhost:5173", // ✅ Must be a specific origin, not "*"
    credentials: true, // ✅ Allows cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allowed methods
    allowedHeaders: ["Content-Type", "Authorization", "Accept"], // ✅ Allowed headers
  })
);

app.use((req, res, next) => {
  console.log("Incoming Request: ", req.method, req.path, req.headers);
  next();
});

app.use("/api/refresh", refreshRoute);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

// Always add IP and PORT
const DB = "mongodb://127.0.0.1:27017/personal-blog"; // local server momentarily, needs to be switched to an Atlas server for deployment
const port = process.env.PORT || 5000;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to Database");
    start_sslServer();
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
    console.log("Running server on port ", port);
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
