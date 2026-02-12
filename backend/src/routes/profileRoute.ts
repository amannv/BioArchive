import { Router } from "express";
import { getProfile, setupProfile } from "../controllers/profileController.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
const profileRouter = Router();

profileRouter.patch("/profile", userMiddleware, setupProfile);
profileRouter.get("/me", userMiddleware, getProfile);

export default profileRouter;