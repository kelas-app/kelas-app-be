import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  description: string;
  price: number;
  sellerId: string;
  productImage: string[];
  isVisible: boolean; 
  isCompleted: boolean; 
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  sellerId: { type: String, required: true },
  productImage: { type: [String], required: true },
  isVisible: { type: Boolean, default: true }, 
  isCompleted: { type: Boolean, default: false } 
});

export default mongoose.model<IProduct>('Product', ProductSchema);