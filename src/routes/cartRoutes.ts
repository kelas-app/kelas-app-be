import express from 'express';
import { addToCart, removeFromCart, updateCartItem, viewCart, checkout } from '../controllers/cartController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticateToken);

router.post('/add', addToCart);
router.delete('/remove/:productId', removeFromCart);
router.put('/update/:productId', updateCartItem);
router.get('/view', viewCart);
router.post('/checkout', checkout);

export default router;
