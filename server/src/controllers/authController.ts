import { Request, Response, CookieOptions } from "express";
import { User } from "../models/userModel";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const currentEnv = process.env.ENV_TYPE;
  const devCookieOptions: CookieOptions = {
    sameSite: "lax" as "lax",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: false,
    path: "/",
  };
  const cookieOptions =
    currentEnv === "development"
      ? devCookieOptions
      : { ...devCookieOptions, sameSite: "strict" as "strict", secure: true };

  // to be replaced with actual JWT
  if (!req.body.email)
    res.status(400).json({ message: "Username and password are required." });

  try {
    console.log("Received login request", email); // Debug log
    const user = await User.findOne({ email }); // Finding the user

    if (!user) {
      res.status(401).json({ message: "Invalid Email" });
      return;
    }

    // if a user is found, checking if the password matches
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(401).json({ message: "Invalid Password" });
        return;
      }

      // signing the JWT tokens
      const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "900s" }
      );

      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("jwt", refreshToken, cookieOptions);

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
