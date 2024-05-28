import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { productSchema } from '../utils/validation';
import validate from '../middleware/validationMiddleware';
import { checkSellerRole } from '../middleware/roleMiddleware'; // Use the correct path


const router = express.Router();

router.use(authenticateToken);

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', validate(productSchema), checkSellerRole, createProduct);
router.put('/:id', validate(productSchema), checkSellerRole, updateProduct);
router.delete('/:id', checkSellerRole, deleteProduct);

export default router;
