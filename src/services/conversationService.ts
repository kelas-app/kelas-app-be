import Conversation, { IConversation } from '../models/Conversation';

export const createConversation = async (participants: string[]): Promise<IConversation> => {
  const conversation = new Conversation({ participants, lastMessage: '' });
  return await conversation.save();
};

export const getConversations = async (userId: string): Promise<IConversation[]> => {
  return await Conversation.find({ participants: userId }).sort({ lastMessageAt: -1 });
};
