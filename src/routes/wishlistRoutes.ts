import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { addToWishlist, removeFromWishlist, getWishlist } from '../controllers/wishlistController';

const router = express.Router();

router.use(authenticateToken);

router.post('/wishlist', addToWishlist);
router.delete('/wishlist', removeFromWishlist);
router.get('/wishlist/:userId', getWishlist);

export default router;
