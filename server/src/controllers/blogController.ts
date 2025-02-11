import { Blog } from "../models/blogModel";
import { Request, Response } from "express";

export const getBlogs = async (req: Request, res: Response) => {
  try {
    console.log("Fetching blogs..."); // Debug log
    const blogs = await Blog.find();
    console.log("Found blogs"); // Debug log
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error); // Debug log
    res.status(500).json({ error: error });
  }
};

export const getBlogByID = async (req: Request, res: Response) => {
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
};

export const deleteBlogByID = async (req: Request, res: Response) => {
  try {
    const deleteBlog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};

export const createBlog = async (req: Request, res: Response) => {
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
};
