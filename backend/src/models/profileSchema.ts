import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    username: { type: String, unique: true, default: "" },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
})

export const profileModel = mongoose.model("Profile", profileSchema);