import { Request, Response } from "express";
import UserI from "../models/userModel";

const handleLogin = async (req: Request, res: Response) => {
  const { user, pwd }: UserI = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  if (user === "admin" && pwd === "admin") {
    return res.status(200).json({ message: "Login successful" });
  }
};

export default handleLogin;
