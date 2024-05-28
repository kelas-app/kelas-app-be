import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string; // New category field
  description: string;
  price: number;
  seller_id: string; // Reference to the _id field of the User document
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // New category field
  description: { type: String, required: true },
  price: { type: Number, required: true },
  seller_id: { type: String, required: true }, // Reference to the _id field of the User document
});

export default mongoose.model<IProduct>('Product', ProductSchema);
