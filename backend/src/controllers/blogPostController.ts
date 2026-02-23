import { type Request, type Response } from "express";
import { blogPageModel } from "../models/blogPageSchema.js";
import { blogPostModel } from "../models/blogPostSchema.js";
import { uploadOnCloudinary } from "../utils/cloudinaryService.js";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const images = (req.files as Express.Multer.File[]) ?? [];
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        message: "Title and body are required",
      });
    }

    const blogpage = await blogPageModel.findOne({ userId: userId });

    if (!blogpage) {
      return res.status(400).json({
        message: "Blogpage not found",
      });
    }

    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const result = await uploadOnCloudinary(image.path);
        return {
          url: result?.secure_url,
          public_id: result?.public_id,
        };
      }),
    );

    if (!blogpage) {
      return res.status(404).json({
        message: "Blogpage not found",
      });
    }

    const blogPageId = blogpage._id;

    const postCreated = await blogPostModel.create({
      title,
      body,
      blogPageId: blogPageId,
      images: imageUrls,
    });

    if (postCreated) {
      return res.status(201).json({
        data: postCreated,
        message: "Post created successfuly",
      });
    }
  } catch (e) {
    console.error("Error occured while creating post", e);
    return res.status(500).json({
      message: "Internal server error while creating post",
    });
  }
};

export const updateBlog = async (req: Request, res: Response) => {};

export const deleteBlog = async (req: Request, res: Response) => {};
