import { type Request, type Response } from "express";
import { profileModel } from "../models/profileSchema.js";
import { uploadOnCloudinary } from "../utils/cloudinaryService.js";
import { blogPageModel } from "../models/blogPageSchema.js";

export const setupProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const avatar = req.file?.path;
    const { username, firstName, lastName, bio } = req.body;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!avatar) {
      return res.status(400).json({
        message: "Avatar is required",
      });
    }

    const imageUploaded = await uploadOnCloudinary(avatar);

    if (!imageUploaded) {
      return res.status(400).json({
        message: "Error while uploading the avatar",
      });
    }

    const profileUpdate = await profileModel.findOneAndUpdate(
      { userId: userId },
      {
        username,
        firstName,
        lastName,
        bio,
        avatar: imageUploaded.secure_url,
      },
      {
        runValidators: true,
        new: true,
      },
    );

    if (!profileUpdate) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    if (profileUpdate) {
      return res.status(200).json({
        message: "Profile successfully updated",
        profile: profileUpdate,
      });
    }
  } catch (e) {
    console.error("Error while updating profile", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
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
