import { Request, Response, NextFunction } from 'express';
import User from '../models/User'; // Ensure you have a User model that contains roles

export const checkSellerRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user.id); // Find the user by ID attached in the req.user by authenticateToken middleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'seller') {
      return res.status(403).json({ message: 'Access denied. Seller role required.' });
    }

    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
