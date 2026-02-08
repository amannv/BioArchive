import mongoose, { mongo } from "mongoose";

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    images: { type: [String], default: [] },
    blogPageId: { type: mongoose.Schema.ObjectId, ref: "BlogPages" },
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
 }, { timestamps: true });

export const blogPostModel = mongoose.model("BlogPosts", blogPostSchema);