import { type Request, type Response } from "express";
import { blogPageModel } from "../models/blogPageSchema.js";
import { profileModel } from "../models/profileSchema.js";

export const setupBlogPage = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { github, instagram, linkedin, twitter } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const response = await profileModel.findOne({
      userId: userId,
    });

    if (!response) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    const username = response.username;
    const avatar = response.avatar;

    const pageSetupDone = await blogPageModel.create({
      github,
      instagram,
      linkedin,
      twitter,
      username,
      avatar,
      userId: userId,
    });

    if (pageSetupDone) {
      return res.status(201).json({
        message: "Page created successfully",
      });
    }
  } catch (e) {
    console.error("Error occured while page creation", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getBlogPage = async (req: Request, res: Response) => {};
