import { Request, Response } from "express";
import User from "../models/User";
import { ratingReviewSchema } from "../utils/validation";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const addRatingAndReview = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { value, comment } = req.body;
  const { error } = ratingReviewSchema.validate({ value, comment });
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.ratings.push({ value, comment });
    await user.save();
    return res.status(201).json({ message: "Rating and review added successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRatingsAndReviews = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user.ratings);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
