import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogPostController.js";
const blogPostRouter = Router();

blogPostRouter.post(
  "/create",
  userMiddleware,
  upload.array("images", 8),
  createBlog,
);
blogPostRouter.patch("/update/:id", userMiddleware, updateBlog);
blogPostRouter.delete("/delete/:id", userMiddleware, deleteBlog);

export default blogPostRouter;
