import { Request, Response } from 'express';
import Message from '../models/Message';
import Conversation from '../models/Conversation';

export const sendMessage = async (req: Request, res: Response) => {
  const { conversationId, sender, content } = req.body;
  try {
    const message = new Message({ conversationId, sender, content });
    await message.save();

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: content,
      lastMessageAt: new Date(),
    });

    res.status(201).json(message);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ error: typedError.message });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  try {
    const messages = await Message.find({ conversationId }).sort({ sentAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ error: typedError.message });
  }
};
