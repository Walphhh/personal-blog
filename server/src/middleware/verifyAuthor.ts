import { Request, Response, NextFunction } from "express";
import { Blog, BlogI } from "../models/blogModel";
import { User } from "../models/userModel";
import { blogController } from "../controllers/blogController";
import { CustomRequest } from "../types/types";

const verifyAuthor = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("In verifyAuthor");
  const userID = req.userID;
  const blog = await Blog.findById(req.params.id);
  const user = await User.findById(req.userID);
  console.log(user);

  if (blog?.authorUserID !== userID || user?.role !== "admin") {
    res.status(401).json({
      message: "You are unauthorised to proceed with this action",
    });
  }

  next();
};

export default verifyAuthor;
