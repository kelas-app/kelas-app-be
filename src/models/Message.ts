import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  conversationId: string;
  sender: string;
  content: string;
  sentAt: Date;
}

const MessageSchema: Schema = new Schema({
  conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>('Message', MessageSchema);
