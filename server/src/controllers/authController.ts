import { Request, Response } from "express";
import { User } from "../models/userModel";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

export const handleLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // to be replaced with actual JWT
  if (!username || !password)
    res.status(400).json({ message: "Username and password are required." });

  try {
    console.log("Received login request", username, password); // Debug log
    const user = await User.findOne({ username, password }); //

    if (user) {
      const accessToken = jwt.sign(
        { username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15s" }
      );

      const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      const updatedUser = await User.findOneAndUpdate(
        { username: user.username }, // finding the user
        { refreshToken: refreshToken }, // updating user's refreshToken
        { new: true } // return the updated user
      );

      console.log("New user refreshToken");
      console.log(refreshToken);
      console.log(accessToken);

      console.log("New updated user: ", updatedUser);

      console.log("User found:", user);

      res
        .status(200)
        .json({ refreshToken, accessToken, message: "Login successful" });
    }
  } catch (err) {
    console.log(err);
  }
};
