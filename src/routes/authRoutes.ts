import express from 'express';
import { registerUser, loginUser, generateNeverExpiringToken } from '../controllers/authController';
import { registerSchema, loginSchema } from '../utils/validation';
import validate from '../middleware/validationMiddleware';

const router = express.Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.post('/generateToken', generateNeverExpiringToken)

export default router;
