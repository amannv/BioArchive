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
    });
    console.log("File is uploaded on cloudinary", response.url);
    return response;
  } catch (e) {
    console.error("Error while uploading image", e );
    return null;
  } finally {
    fs.unlinkSync(localFilePath);
  }
};
