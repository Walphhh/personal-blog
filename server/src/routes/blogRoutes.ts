import express, { Router } from "express";
import { authenticateUser } from "../middleware/authenticateUser";
import {
  getBlogs,
  getBlogByID,
  deleteBlogByID,
  createBlog,
} from "../controllers/blogController";

const router: Router = express.Router();

// GET - all Blogs
router.get("/", getBlogs);

// GET:id - specific blog
router.get("/:id", getBlogByID);

// DELETE:id
router.delete("/:id", deleteBlogByID);

// POST
router.post("/", createBlog);

export default router;
