import express from "express";
import {
  registerUser,
  loginUser,
  validateToken,
} from "../controllers/authController";

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

// GET /api/auth/validate
router.get("/validate", validateToken);

export default router;
