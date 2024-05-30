import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticateToken);

router.post('/', sendMessage);
router.get('/:conversationId', getMessages);

export default router;
