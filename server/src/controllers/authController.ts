import { Request, Response } from "express";
import { User } from "../models/userModel";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // to be replaced with actual JWT
  if (!email || !password)
    res.status(400).json({ message: "Username and password are required." });

  try {
    console.log("Received login request", email, password); // Debug log
    const user = await User.findOne({ email, password }); //

    if (!user) {
      res.status(401).json({ message: "Invalid Username or Password" });
      return;
    }

    if (user) {
      const accessToken = jwt.sign(
        { email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );

      const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "lax", // set to not lax in prod
        secure: true, // set to true in prod
        path: "/",
      });

      const updatedUser = await User.findOneAndUpdate(
        { email: user.email }, // finding the user
        { refreshToken: refreshToken }, // updating user's refreshToken
        { new: true } // return the updated user
      );

      console.log("New updated user: ", updatedUser);
      console.log("Access Token: ", accessToken);
      console.log("Refresh Token: ", refreshToken);
      res.status(200).json({
        id: user.id,
        username: user.username,
        role: user.role, // not very secure because an attacker could just modify the role
        accessToken,
        message: "Login successful",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
