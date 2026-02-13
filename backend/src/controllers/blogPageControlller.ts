import { type Request, type Response, } from "express";
import { blogPageModel } from "../models/blogPageSchema.js";
import { profileModel } from "../models/profileSchema.js";

export const setupBlogPage = async (req: Request, res: Response) => {
    const userId = req.userId;
    const { github, instagram, linkedin, twitter } = req.body;

    if(!userId) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    const response = await profileModel.findOne({
        userId: userId,
    });

    if(!response) {
        return res.status(404).json({
            message: "Profile not found",
        })
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
    });
    
}

export const getBlogPage = async (req: Request, res: Response) => {
    
}