import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { productSchema } from '../utils/validation';
import validate from '../middleware/validationMiddleware';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', validate(productSchema), createProduct);
router.put('/:id', validate(productSchema), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
