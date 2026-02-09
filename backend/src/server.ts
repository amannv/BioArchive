import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./db/db.js";

const app = express();
app.use(express.json());
connectDB();

import userRouter from "./routes/userRoute.js";

app.use("/api/v1/user", userRouter)

app.listen(process.env.PORT, () => {
    console.log("Server is Running on PORT " + process.env.PORT);
})