import express from 'express';
import { createConversation, getConversations } from '../controllers/conversationController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticateToken);

router.post('/', createConversation);
router.get('/:userId', getConversations);

export default router;
