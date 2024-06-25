import express from "express";
import dotenv from "dotenv";
import postRoutes from "./routes/post-routes";

dotenv.config();

const app = express();

// Body parser middleware
app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);

export default app;
