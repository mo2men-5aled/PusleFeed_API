import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

// Body parser middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

export default app;
