import express, { Router } from "express";
import { blogController } from "../controllers/blogController";
import { verifyJWT } from "../middleware/verifyJWT";

const router: Router = express.Router();

router
  .route("/")
  .get(blogController.getBlogs) // GET - all Blogs
  .post(verifyJWT, blogController.createBlog); // POST

router
  .route("/:id")
  .get(verifyJWT, blogController.getBlogByID) // GET:id - specific blog
  .delete(verifyJWT, blogController.deleteBlogByID); // DELETE:id

export default router;
