import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/auth.model";


export const signupLogic = async (req: Request, res: Response) => {
  try {
    // 1. Get data from request body
    const { username, password } = req.body;

    // 2. Basic validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        message: "Username already taken",
      });
    }

    // 4. Hash password (IMPORTANT)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user in DB
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    // 6. Send response
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Signup failed",
      error,
    });
  }
};
