import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    addRatingAndReview,
    getRatingsAndReviews
} from '../controllers/userController';

const router = express.Router();

router.use(authenticateToken);

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/:id/ratings', addRatingAndReview);
router.get('/:id/ratings', getRatingsAndReviews);

export default router;
