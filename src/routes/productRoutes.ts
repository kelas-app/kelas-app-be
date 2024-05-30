import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { checkSellerRole } from '../middleware/roleMiddleware';
import upload from '../utils/upload';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', upload.array('productImage', 2), checkSellerRole, createProduct);
<<<<<<< HEAD
router.put('/:id', checkSellerRole, updateProduct);
=======
router.put('/:id', upload.array('productImage', 2), checkSellerRole, updateProduct);
>>>>>>> 7731adb44cec7a23c1865d781db96fb6627e9594
router.delete('/:id', checkSellerRole, deleteProduct);

export default router;