import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import * as orderController from '../controllers/orderController';

const router = express.Router();

router.use(authenticateToken);

router.get('/dashboard', orderController.getSellerDashboard);
router.get('/', orderController.getUserOrderHistory);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

export default router;
