import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";

export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "User not signed in",
      });
    }
    if (!authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        message: "Invalid token format",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "User not signed in",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT Doesn't exists",
      });
    }

    const userVerified = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };

    if (userVerified) {
      req.userId = userVerified.userId;
      next();
    }
  } catch (e) {
    console.error("Invalid token", e);
    return res.status(500).json({
      message: "Invalid token",
    });
  }
};
