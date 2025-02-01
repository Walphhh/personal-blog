import express, { Router } from "express";
import { Blog } from "./blogModel";

const router: Router = express.Router();

// Add console.log to debug
router.get("/blogs", async (req, res) => {
  try {
    console.log("Fetching blogs..."); // Debug log
    const blogs = await Blog.find();
    console.log("Found blogs:", blogs); // Debug log
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error); // Debug log
    res.status(500).json({ error: error });
  }
});

// GET /api/blogs/:id - Get a specific blog
router.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (error) {
    res.status(404).json({ error: "Blog not found" });
  }
});
export default router;
