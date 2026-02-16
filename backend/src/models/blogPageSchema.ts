import mongoose from "mongoose";

const blogPageSchema = new mongoose.Schema({
    avatar: { type: String, default: "" },
    username: { type: String, default: "", unique: true },
    github: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
})

export const blogPageModel = mongoose.model("BlogPages", blogPageSchema);