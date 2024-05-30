import mongoose, { Schema, Document } from 'mongoose';

export interface IConversation extends Document {
    participants: string[];
    lastMessage: string;
    lastMessageAt: Date;
    productImage?: string;
}

const ConversationSchema: Schema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    lastMessage: { type: String, required: true },
    lastMessageAt: { type: Date, default: Date.now },
    productImage: { type: String },
});

export default mongoose.model<IConversation>('Conversation', ConversationSchema);
