import { Blog } from "../models/blogModel";
import { Request, Response } from "express";
import { CustomRequest } from "../types/types";
import { lstatSync } from "fs";
import jwt from "jsonwebtoken";

export const blogController = {
  getBlogs: async (req: Request, res: Response) => {
    try {
      // const batchLimit = 10; // limit;
      // const currentCursor = req.params.cursor; // cursor to point to the next batch of blogs

      // let query = {};

      // if (currentCursor) {
      //   const [timestamp, id] = currentCursor.split("|");

      //   query = {
      //     $or: [
      //       { createdAt: { $lt: new Date(timestamp) } },
      //       { createdAt: new Date(timestamp), _id: { $lt: id } },
      //     ],
      //   };
      // }

      // console.log("Fetching blogs..."); // Debug log
      // const blogs = await Blog.find()
      //   .sort({ createdAt: -1, _id: -1 })
      //   .limit(batchLimit + 1);
      // console.log("Found blogs"); // Debug log

      // const hasNextPage = blogs.length > batchLimit;
      // const slicedBlogs = blogs.slice(0, batchLimit);
      // const lastBlog = slicedBlogs[slicedBlogs.length - 1];

      // const nextCursor = hasNextPage
      //   ? `${lastBlog.createdAt.toISOString()}|${
      //       slicedBlogs[slicedBlogs.length - 1]._id
      //     }`
      //   : null;

      const blogs = await Blog.find().sort({ createdAt: -1, _id: -1 });

      res.json({ blogs: blogs });
    } catch (error) {
      console.error("Error fetching blogs:", error); // Debug log
      res.status(500).json({ error: error });
    }
  },

  getBlogByID: async (req: Request, res: Response) => {
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
  },

  deleteBlogByID: async (req: CustomRequest, res: Response) => {
    try {
      await Blog.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (err) {
      console.log(err);
    }
  },

  createBlog: async (req: Request, res: Response) => {
    try {
      // Creating a new blog based on the req
      const newBlog = new Blog({
        title: req.body.title,
        description: req.body.description,
        body: req.body.body,
        authorUserID: req.body.authorUserID,
      });
      const savedBlog = await newBlog.save(); // saving the new Blog
      res.status(201).json(savedBlog); // sending back the doc
    } catch (err) {
      console.log(err);
    }
  },

  updateBlog: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      console.log("Updating Blog with ID: ", req.body._id);
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        body: req.body.body,
      });
      console.log(updatedBlog);
      res.status(200).json({ message: "Blog Updated" });
    } catch (err) {
      console.log(err);
    }
  },
};
