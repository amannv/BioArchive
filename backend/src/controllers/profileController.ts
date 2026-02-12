import { type Request, type Response } from "express";
import { profileModel } from "../models/profileSchema.js";

export const setupProfile = async (req: Request, res: Response) => {
    
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const userData = await profileModel.findOne({
      userId: userId,
    });

    if (userData) {
      return res.status(200).json({
        message: "User profile found",
        data: userData,
      });
    }
  } catch (e) {
    console.error("Error while fetching profile");
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
