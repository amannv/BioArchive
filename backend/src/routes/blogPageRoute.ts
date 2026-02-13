import { Router } from "express";
import { getBlogPage, setupBlogPage } from "../controllers/blogPageControlller.js";
const blogPageRouter = Router();

blogPageRouter.patch("/", setupBlogPage);
blogPageRouter.get("/:username", getBlogPage);

export default blogPageRouter;