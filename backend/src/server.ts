import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./db/db.js";

const app = express();
app.use(express.json());
connectDB();

import userRouter from "./routes/userRoute.js";
import profileRouter from "./routes/profileRoute.js";

app.use("/api/v1/user", userRouter)
app.use("/api/v1/profile", profileRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is Running on PORT " + process.env.PORT);
})