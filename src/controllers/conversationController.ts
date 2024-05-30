import { Request, Response } from 'express';
import Conversation from '../models/Conversation';
import Message from '../models/Message'
import User from '../models/User';

export const createConversation = async (req: Request, res: Response) => {
    const { participants } = req.body;

    try {
        const users = await User.find({ _id: { $in: participants } });

        if (users.length !== participants.length) {
            return res.status(400).json({ error: 'One or more participants are not registered users.' });
        }

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

export const sendMessageToSeller = async (req: Request, res: Response) => {
    const { conversationId, sender, content, productImage } = req.body;
    try {
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        const message = new Message({ conversationId, sender, content, productImage });
        await message.save();

        conversation.lastMessage = content;
        conversation.lastMessageAt = new Date();
        await conversation.save();

        res.status(201).json(message);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};


