import { Request, Response } from "express";
import { User } from "../models/userModel";

export const handleLogout = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    res.status(204).json({ message: "No token provided" });
    return;
  }

  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken: refreshToken });

  if (!user) {
    res
      .sendStatus(204)
      .clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "lax" });
    return;
  }

  await user.updateOne({ refreshToken: "" });
  res
    .clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "lax" })
    .sendStatus(200);
};
 