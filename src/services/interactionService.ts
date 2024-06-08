import Interaction from '../models/Interaction';
import fs from 'fs';
import path from 'path';

export default class InteractionService {

  static async getAllInteractions() {
    try {
        const interactions = await Interaction.find();
        return interactions;
    } catch (error){
      throw new Error('Failed to get all interactions');
    }
  }

  static async getUserInteractions(userId: string) {
    try {
      const interactions = await Interaction.find({ userId });
      return interactions;
    } catch (error) {
      throw new Error('Failed to get user interactions');
    }
  }

  static async trackInteraction(userId: string, productId: string, interactionType: 'addToCart' | 'getProductById' | 'createOrder', interactionValue: number) {
    try {
      const existingInteraction = await Interaction.findOne({ userId, productId, interactionType });
      
      if (existingInteraction) {
        existingInteraction.interactionValue += interactionValue;
        await existingInteraction.save();
        return existingInteraction;
      } else {
        const interaction = await Interaction.create({
          userId,
          productId,
          interactionType,
          interactionValue,
          timestamp: new Date(),
        });
        return interaction;
      }
    } catch (error) {
      throw new Error('Failed to track interaction');
    }
  }

  static async prepareInteractionsForDownload() {
    try {
      console.log('Preparing interactions for download'); 
      const interactions = await this.getAllInteractions();
      const downloadDir = path.join(__dirname, '..', 'downloads');
      if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir);
      }
      const filePath = path.join(downloadDir, 'interactions.json');
      fs.writeFileSync(filePath, JSON.stringify(interactions, null, 2));
      console.log('Interactions prepared at:', filePath);
      return filePath;
    } catch (error) {
      throw new Error('Failed to prepare interactions for download');
    }
  }

}
