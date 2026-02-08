import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
})

export const profileModel = mongoose.model("Profile", profileSchema);