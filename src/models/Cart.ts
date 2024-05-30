import mongoose, { Schema, Document } from 'mongoose';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ShoppingCartDocument extends Document {
  userId: string;
  items: CartItem[];
}

const CartItemSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const ShoppingCartSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [CartItemSchema],
});

const ShoppingCart = mongoose.model<ShoppingCartDocument>('ShoppingCart', ShoppingCartSchema);

export default ShoppingCart;
