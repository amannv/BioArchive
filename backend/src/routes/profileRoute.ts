import { Router } from "express";
import { getProfile, setupProfile } from "../controllers/profileController.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { upload } from "../middleware/multer.middleware.js";
const profileRouter = Router();

profileRouter.patch("/", userMiddleware, upload.single("avatar"), setupProfile);
profileRouter.get("/me", userMiddleware, getProfile);

export default profileRouter;
