import { Request, Response, NextFunction } from 'express';

// Middleware function to handle errors
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error.stack);
  res.status(500).json({ message: 'Something went wrong' });
};
