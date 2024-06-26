// src/controllers/authController.ts

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/User";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { firstname, lastname, username, email, password } = req.body;

  const errorLog = [];

  if (!firstname) {
    errorLog.push("First name is required");
  }
  if (!lastname) {
    errorLog.push("Last name is required");
  }
  if (!username) {
    errorLog.push("Username is required");
  }
  if (!email) {
    errorLog.push("Email is required");
  }
  if (!password) {
    errorLog.push("Password is required");
  }

  if (errorLog.length > 0) {
    res.status(400).json({ errors: errorLog });
    return;
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists with that email" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const errorLog = [];
  if (!email) {
    errorLog.push("Email is required");
  }
  if (!password) {
    errorLog.push("Password is required");
  }

  if (errorLog.length > 0) {
    res.status(400).json({ errors: errorLog });
    return;
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET as Secret,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const validateToken = (req: Request, res: Response): void => {
  const token: any = req.header("Authorization")?.split(" ")[1];
  console.log(token);

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);
    res.status(200).json({ user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
