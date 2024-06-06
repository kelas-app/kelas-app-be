import mongoose, { Schema, Document } from 'mongoose';

export interface Interaction extends Document {
  userId: string;
  productId: string;
  interactionType: 'addToCart' | 'getProductById' | 'createOrder';
  interactionValue: number;
  timestamp: Date;
}

const InteractionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  interactionType: { type: String, enum: ['addToCart', 'getProductById', 'createOrder'], required: true },
  interactionValue: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

InteractionSchema.index({ userId: 1, productId: 1, interactionType: 1 }, { unique: true });

const Interaction = mongoose.model<Interaction>('Interaction', InteractionSchema);

export default Interaction;
