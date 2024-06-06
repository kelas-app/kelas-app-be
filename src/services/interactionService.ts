import Interaction from '../models/Interaction';

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

}
