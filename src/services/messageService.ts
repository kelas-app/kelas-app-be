import Message, { IMessage } from '../models/Message';
import Conversation from '../models/Conversation';

export const sendMessage = async (conversationId: string, sender: string, content: string): Promise<IMessage> => {
  const message = new Message({ conversationId, sender, content });
  await message.save();

  await Conversation.findByIdAndUpdate(conversationId, {
    lastMessage: content,
    lastMessageAt: new Date(),
  });

  return message;
};

export const getMessages = async (conversationId: string): Promise<IMessage[]> => {
  return await Message.find({ conversationId }).sort({ sentAt: 1 });
};
