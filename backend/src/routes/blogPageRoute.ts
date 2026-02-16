import { Router } from "express";
import { getBlogPage, setupBlogPage } from "../controllers/blogPageControlller.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
const blogPageRouter = Router();

blogPageRouter.patch("/", userMiddleware, setupBlogPage);
blogPageRouter.get("/:username", getBlogPage);

export default blogPageRouter;