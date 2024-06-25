// post-service/src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import axios from "axios";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // it is a get request in the api
    const response = await axios.get(
      "http://localhost:5000/api/auth/validate",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    req.user = response.data.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
