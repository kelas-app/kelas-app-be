import { Request, Response } from 'express';
import InteractionService from '../services/interactionService';
import fs from 'fs';
import path from 'path';

export default class InteractionController {
  static async getAllInteractions(req: Request, res: Response) {
    try {
      const interactions = await InteractionService.getAllInteractions();
      res.status(200).json({ interactions });
    } catch (error) {
      const typedError = error as Error;
      res.status(500).json({ error: typedError.message });
    }
  }

  static async getUserInteractions(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const interactions = await InteractionService.getUserInteractions(userId);
      res.status(200).json({ interactions });
    } catch (error) {
      const typedError = error as Error;
      res.status(500).json({ error: typedError.message });
    }
  }

  static async trackInteraction(req: Request, res: Response) {
    try {
      const { userId, productId, interactionType, interactionValue } = req.body;
      const interaction = await InteractionService.trackInteraction(userId, productId, interactionType, interactionValue);
      res.status(201).json({ interaction });
    } catch (error) {
      const typedError = error as Error;
      res.status(500).json({ error: typedError.message });
    }
  }

  static async downloadInteractions(req: Request, res: Response) {
    try {
      console.log('Download interactions called');
      const filePath = await InteractionService.prepareInteractionsForDownload();
      res.download(filePath, 'interactions.json', (err) => {
        if (err) {
          throw new Error('Failed to download interactions');
        }
        fs.unlinkSync(filePath);
      });
    } catch (error) {
      const typedError = error as Error;
      console.error('Error in downloadInteractions:', typedError.message);
      res.status(500).json({ error: typedError.message });
    }
  }


}
