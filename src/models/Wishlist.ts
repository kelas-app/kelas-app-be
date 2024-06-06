import mongoose, { Schema, Document } from 'mongoose';

export interface WishlistItem {
  productId: string;
}

export interface WishlistDocument extends Document {
  userId: string;
  items: WishlistItem[];
}

const WishlistItemSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

const WishlistSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [WishlistItemSchema],
});

const Wishlist = mongoose.model<WishlistDocument>('Wishlist', WishlistSchema);

export default Wishlist;
