import mongoose from "mongoose";

const blogPageSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    github: { type: String, default: "" },
    instgram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    blogPosts: { type: [mongoose.Schema.ObjectId], default: [] },
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
})

export const blogPageModel = mongoose.model("BlogPages", blogPageSchema);