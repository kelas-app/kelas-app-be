import { Request, Response } from 'express';
import Conversation from '../models/Conversation';

export const createConversation = async (req: Request, res: Response) => {
  const { participants } = req.body;
  try {
    const conversation = new Conversation({ participants, lastMessage: 'No messages yet.' });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ error: typedError.message });
  }
};

export const getConversations = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const conversations = await Conversation.find({ participants: userId }).sort({ lastMessageAt: -1 });
    res.status(200).json(conversations);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ error: typedError.message });
  }
};
