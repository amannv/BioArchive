import mongoose, { mongo } from "mongoose";
import { string } from "zod";
import { required } from "zod/mini";

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    blogPageId: { type: mongoose.Schema.ObjectId, ref: "BlogPages" },
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export const blogPostModel = mongoose.model("BlogPosts", blogPostSchema);
