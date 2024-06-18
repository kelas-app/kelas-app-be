import User, { IUser } from "../models/User"

export const registerUser = async (userData: IUser): Promise<IUser> => {
  try {
    return await User.create(userData)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to register user: ${error.message}`)
    } else {
      throw new Error("Failed to register user: Unknown error occurred")
    }
  }
}

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    return await User.findOne({ email })
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to find user by email: ${error.message}`)
    } else {
      throw new Error("Failed to find user by email: Unknown error occurred")
    }
  }
}

export const findUserById = async (id: string): Promise<IUser | null> => {
  try {
    return await User.findById(id)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to find user by ID: ${error.message}`)
    } else {
      throw new Error("Failed to find user by ID: Unknown error occurred")
    }
  }
}

export const addRatingAndReview = async (
  userId: string,
  rating: number,
  comment: string
): Promise<void> => {
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new Error("User not found")
    }
    user.ratings.push({ value: rating, comment })
    await user.save()
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to add rating and review: ${error.message}`)
    } else {
      throw new Error("Failed to add rating and review: Unknown error occurred")
    }
  }
}

export const getRatingsAndReviews = async (
  userId: string
): Promise<{ value: number; comment: string }[]> => {
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new Error("User not found")
    }
    return user.ratings
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to get ratings and reviews: ${error.message}`)
    } else {
      throw new Error(
        "Failed to get ratings and reviews: Unknown error occurred"
      )
    }
  }
}

export const updateUserProfile = async (
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new Error("User not found")
    }

    // Update user properties based on the provided data
    Object.assign(user, updateData)

    await user.save()
    return user
  } catch (error: any) {
    throw new Error(`Unable to update profile: ${error.message}`)
  }
}
