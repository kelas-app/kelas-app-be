import User, { IUser } from "../models/User";

export const registerUser = async (userData: IUser): Promise<IUser> => {
  try {
    return await User.create(userData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to register user: ${error.message}`);
    } else {
      throw new Error("Failed to register user: Unknown error occurred");
    }
  }
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    return await User.findOne({ email });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to find user by email: ${error.message}`);
    } else {
      throw new Error("Failed to find user by email: Unknown error occurred");
    }
  }
};

export const findUserById = async (id: string): Promise<IUser | null> => {
  try {
    return await User.findById(id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to find user by ID: ${error.message}`);
    } else {
      throw new Error("Failed to find user by ID: Unknown error occurred");
    }
  }
};
