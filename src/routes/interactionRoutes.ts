import express from 'express';
import InteractionController from '../controllers/interactionController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticateToken);

router.get('/', InteractionController.getAllInteractions);
router.get('/:userId', InteractionController.getUserInteractions);
router.post('/', InteractionController.trackInteraction);

export default router;
