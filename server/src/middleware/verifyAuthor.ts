import { Request, Response, NextFunction } from "express";
import { Blog, BlogI } from "../models/blogModel";
import { blogController } from "../controllers/blogController";
const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const blogID = req.params.id;
  const userID = req.userID;

  const blog = await Blog.findById(req.params.id);

  if (blog?.authorUserID === userID) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You are unauthorised to proceed with this action" });
    return;
  }
};
