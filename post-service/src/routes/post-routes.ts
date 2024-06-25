// post-service/src/routes/post-routes.ts

import express from "express";
import * as postController from "../controllers/post-controller";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, postController.getAllPosts);
router.get("/:id", authMiddleware, postController.getPostById);
router.post("/", authMiddleware, postController.createPost);
router.patch("/:id", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);

export default router;
