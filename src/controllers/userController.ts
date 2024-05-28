import { Request, Response } from 'express';
import User from '../models/User'; // Assuming you have a User model

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error: any) { // Explicitly specify the type of error
        res.status(500).json({ message: error.message });
    }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) { // Explicitly specify the type of error
        res.status(500).json({ message: error.message });
    }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error: any) { // Explicitly specify the type of error
        res.status(500).json({ message: error.message });
    }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error: any) { // Explicitly specify the type of error
        res.status(500).json({ message: error.message });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error: any) { // Explicitly specify the type of error
        res.status(500).json({ message: error.message });
    }
};
