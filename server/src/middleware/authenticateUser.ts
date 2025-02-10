import { Request, Response, NextFunction } from "express";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No Token" });
    }

    if (token === "admin") next();

    return res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
