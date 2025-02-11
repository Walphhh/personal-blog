import { Request, Response } from "express";
import { User } from "../models/userModel";

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// require("dotenv").config();

export const handleLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // to be replaced with actual JWT
  if (!username || !password)
    res.status(400).json({ message: "Username and password are required." });

  try {
    console.log("Received login request", username, password); // Debug log
    const user = await User.findOne({ username, password });

    if (user) {
      res.status(200).json({ message: "Login successful" });
    }
  } catch (err) {
    console.log(err);
  }
};
