import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import { registerSchema, loginSchema } from '../utils/validation'; // Import the Joi schemas

// Controller for handling authentication-related operations

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
    const { error } = registerSchema.validate(req.body); // Validate the request body
    if (error) {
        return res.status(400).json({ status: 'error', message: error.details[0].message });
    }

    const { firstname, lastname, username, email, phone, password, address } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Set avatar to default if not provided
        const avatar = req.body.avatar ? req.body.avatar : '/uploads/default_avatar.png';

        // Create a new user
        const newUser = new User({ firstname, lastname, username, email, phone, password: hashedPassword, address, avatar });
        const savedUser = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: savedUser._id }, config.jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ status: 'success', message: 'User created successfully', data: savedUser });
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
    const { error } = loginSchema.validate(req.body); // Validate the request body
    if (error) {
        return res.status(400).json({ message: error.details[0].message }); // Return validation error
    }

    const { email, password } = req.body;
    try {
        // Find user by email (case-insensitive search)
        const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });

        res.json({ token });
    } catch (error: any) { // Explicitly define the type of error
        res.status(500).json({ message: error.message });
    }
};
