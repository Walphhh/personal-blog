import { Request, Response, NextFunction } from "express";
import { Blog, BlogI } from "../models/blogModel";
import { User } from "../models/userModel";
import { blogController } from "../controllers/blogController";
import { CustomRequest } from "../types/types";
import mongoose from "mongoose";

const verifyAuthor = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("In verifyAuthor");
  const blog = await Blog.findById(req.params.id);
  const user = await User.findById(req.userID);

  if (String(blog?.authorUserID) !== String(user?._id)) {
    console.log("Unauthorized user detected");
    res.status(401).json({
      message: "You are unauthorised to proceed with this action",
    });
    return;
  }

  console.log("Author Confirmed");
  next();
};

export default verifyAuthor;
