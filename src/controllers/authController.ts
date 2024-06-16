import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import { registerSchema, loginSchema } from "../utils/validation";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }

  const {
    firstname,
    lastname,
    username,
    email,
    phone,
    password,
    address,
    avatar,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      phone,
      password: hashedPassword,
      address,
      avatar: avatar || "/uploads/default_avatar.png",
    });

    const savedUser = await newUser.save();

    if (!config.jwtSecret) {
      throw new Error('JWT secret is not defined in configuration.');
    }
    
    const token = jwt.sign({ id: savedUser._id }, config.jwtSecret, {
      expiresIn: '1h',
    });

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: { ...savedUser.toObject(), password: undefined },
      token,
    });
  } catch (error: any) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!config.jwtSecret) {
      throw new Error('JWT secret is not defined in configuration.');
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { ...user.toObject(), password: undefined, token},
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const generateNeverExpiringToken = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!config.jwtSecret) {
      throw new Error('JWT secret is not defined in configuration.');
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: "10y",
    });

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { ...user.toObject(), password: undefined, token},
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};