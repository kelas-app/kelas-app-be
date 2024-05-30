import mongoose, { Schema, Document } from 'mongoose';

export interface IConversation extends Document {
  participants: string[];
  lastMessage: string;
  lastMessageAt: Date;
}

const ConversationSchema: Schema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  lastMessage: { type: String, required: true },
  lastMessageAt: { type: Date, default: Date.now },
});

export default mongoose.model<IConversation>('Conversation', ConversationSchema);
