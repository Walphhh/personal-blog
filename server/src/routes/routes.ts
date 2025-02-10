import express, { Router } from "express";
import { Blog } from "../models/blogModel";
import { authenticateUser } from "../middleware/authenticateUser";
const router: Router = express.Router();

// POST - Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Received login request", username, password); // Debug log

    if (username === "admin" && password === "admin") {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

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
    console.log("Finding Blog ID ", req.params.id); // Debug log

    if (!blog) {
      console.log("Blog not found");
      res.status(404).json({ error: "Blog not found" });
      return undefined;
    }

    res.json(blog);
  } catch {
    console.log("Blog not found");
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
