import User, { IUser } from '../models/User';

// Service for user-related operations

// Register a new user
export const registerUser = async (userData: IUser): Promise<IUser> => {
  return User.create(userData);
};

// Find a user by email
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

// Find a user by ID
export const findUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};
