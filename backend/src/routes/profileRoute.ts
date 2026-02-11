import { Router } from "express";
import { getProfile, setupProfile } from "../controllers/profileController.js";
const profileRouter = Router();

profileRouter.patch("/profile", setupProfile);
profileRouter.get("/me", getProfile);

export default profileRouter;