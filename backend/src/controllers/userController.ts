import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { userModel } from "../models/userSchema.js";
import z, { string } from "zod";

export const signupUser = async (req: Request, res: Response) => {
  try {
    const requiredBody = z.object({
      email: z.email(),
      password: z.string().min(6).max(20),
    });

    const parsedBody = requiredBody.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: "Invalid inputs",
        error: parsedBody.error,
      });
    }

    const { email, password } = parsedBody.data;

    const userExists = await userModel.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await userModel.create({
      email,
      password: hashedPassword,
    });

    if (response) {
      return res.status(201).json({
        message: "User signed up successfully",
      });
    }
  } catch (error) {
    console.error("Error while signing up", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
    const requiredBody = z.object({
      email: z.email(),
      password: z.string().min(6).max(20),
    });

    const parsedBody = requiredBody.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: "Invalid inputs",
        error: parsedBody.error,
      });
    }

    const { email, password } = parsedBody.data;

    const userExist = await userModel.findOne({
        email,
    });

    if(!userExist) {
        return res.status(400).json({
            message: "User not exists",
        });
    }

    const passwordCompare = await bcrypt.compare(password, userExist.password);

    if(!passwordCompare) {
        return res.status(400).json({
            message: "Password is incorrect",
        });
    }

    const token = jwt.sign({
        id: userExist._id,
    })


};
