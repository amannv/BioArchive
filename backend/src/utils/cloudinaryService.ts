import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
dotenv.config();
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.CLOUD_API_KEY as string,
  api_secret: process.env.CLOUD_API_SECRET as string,
});

export const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      folder: "blogs"
    });
    return response;
  } catch (e) {
    console.error("Error while uploading image", e );
    return null;
  } finally {
    fs.unlinkSync(localFilePath);
  }
};

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    if(!publicId) return false;
    const imagesDeleted = await cloudinary.uploader.destroy(publicId);
    if (imagesDeleted.result === "ok") {
      console.log("Images deleted successfully");
      return true;
    } else {
      console.log("Failed to delete images");
      return false;
    }
  } catch(e) {
    console.error("Error while deleting images", e);
    return false;
  }
}
