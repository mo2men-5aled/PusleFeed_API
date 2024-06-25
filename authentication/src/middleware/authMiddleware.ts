// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as Secret;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { user: { id: string } };
    // req.user = decoded.user;
    console.log(req);

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
