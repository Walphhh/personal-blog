import express, { Router } from "express";
import { Blog } from "./blogModel";

const router: Router = express.Router();

// GET - all Blogs
router.get("/blogs", async (req, res) => {
  try {
    console.log("Fetching blogs..."); // Debug log
    const blogs = await Blog.find();
    console.log("Found blogs"); // Debug log
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error); // Debug log
    res.status(500).json({ error: error });
  }
});

// GET:id - specific blog
router.get("/blogs/:id", async (req, res) => {
  try {
    // Finds blog based on the req id and sends it back as a JSON document
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (error) {
    res.status(404).json({ error: "Blog not found" });
  }
});

// DELETE:id
router.delete("/blogs/:id", async (req, res) => {
  try {
    const deleteBlog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.log(err);
  }
});

// POST
router.post("/blogs", async (req, res) => {
  try {
    // Creating a new blog based on the req
    const newBlog = new Blog({
      title: req.body.title,
      description: req.body.description,
      body: req.body.body,
    });

    const savedBlog = await newBlog.save(); // saving the new Blog
    res.status(201).json(savedBlog); // sending back the doc
  } catch (err) {
    console.log(err);
  }
});

export default router;
