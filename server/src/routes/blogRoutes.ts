import express, { Router } from "express";
import { blogController } from "../controllers/blogController";
import verifyJWT from "../middleware/verifyJWT";
import verifyAuthor from "../middleware/verifyAuthor";
const router: Router = express.Router();

router
  .route("/")
  .get(blogController.getBlogs) // GET - all Blogs
  .post(verifyJWT.verifyAccessToken, blogController.createBlog); // POST

router
  .route("/:id")
  .get(blogController.getBlogByID) // GET:id - specific blog
  .delete(
    verifyJWT.verifyAccessToken,
    verifyAuthor,
    blogController.deleteBlogByID
  ) // DELETE:id
  .post(verifyJWT.verifyAccessToken, verifyAuthor, blogController.updateBlog);

export default router;
