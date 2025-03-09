import { Request, Response } from "express";
import { User } from "../models/userModel";
import { CustomRequest } from "../types/types";

export const handleLogout = async (req: CustomRequest, res: Response) => {
  console.log("Logging user out");
  if (!req.cookies.jwt) {
    console.log("No Cookie");
    res.status(204).json({ message: "No token provided" });
    return;
  }
  console.log(req.userID);
  const user = await User.findById(req.userID);

  if (user) {
    console.log(user);
  }
  if (!user) {
    res
      .status(204)
      .clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "lax" })
      .json({ message: "User logged out succesfully" });
    return;
  }

  await User.findByIdAndUpdate(user._id, { refreshToken: "" }, { new: true });

  res
    .status(200)
    .clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "lax" })
    .json({ message: "User logged out succesfully" });
};
