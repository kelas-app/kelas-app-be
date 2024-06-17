import express from "express"
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addRatingAndReview,
  getRatingsAndReviews,
  downloadAllUsers,
  updateProfile,
} from "../controllers/userController"
import { authenticateToken } from "../middleware/authMiddleware"
import validate from "../middleware/validationMiddleware"
import { updateUserProfileSchema } from "../utils/validation"

const router = express.Router()

router.use(authenticateToken)

router.get("/download", downloadAllUsers)

router.post("/", createUser)
router.get("/", getUsers)
router.get("/:id", getUserById)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
router.post("/:id/ratings", addRatingAndReview)
router.get("/:id/ratings", getRatingsAndReviews)
router.put("/editprofile/:id", validate(updateUserProfileSchema), updateProfile)

export default router
