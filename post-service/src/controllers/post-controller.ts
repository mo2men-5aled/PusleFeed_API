// post-service/src/controllers/post-controller.ts

import { Request, Response } from "express";
import Post, { IPost } from "../models/post-model";

// GET all posts
export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const posts: IPost[] = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET single post by ID
export const getPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  // if id not exists
  if (!id) {
    res.status(400).json({ message: "Post ID is required" });
    return;
  }

  try {
    const post: IPost | null = await Post.findById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE new post
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, content, author } = req.body;
  const errorLog = [];
  if (!title) {
    errorLog.push("Title is required");
  }
  if (!content) {
    errorLog.push("Content is required");
  }
  if (!author) {
    errorLog.push("Author is required");
  }
  if (errorLog.length > 0) {
    res.status(400).json({ message: errorLog });
    return;
  }

  const newPost: IPost = new Post({
    title,
    content,
    author,
  });

  try {
    const savedPost: IPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE post by ID
export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedPost: IPost | null = await Post.findByIdAndUpdate(
      id,
      { title, content, updatedAt: new Date() },
      { new: true }
    );
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE post by ID
export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "Post ID is required" });
    return;
  }

  try {
    const deletedPost: IPost | null = await Post.findByIdAndDelete(id);
    if (deletedPost) {
      res.status(200).json(deletedPost);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
