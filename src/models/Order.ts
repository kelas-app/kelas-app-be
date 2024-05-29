import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  buyer_id: string;
  sellerId: string;
  product_id: string;
  quantity: number;
  total_price: number;
  order_date: Date;
  status: 'pending' | 'shipped' | 'delivered' | 'canceled';
}

const OrderSchema: Schema = new Schema({
  buyer_id: { type: String, required: true },
  sellerId: { type: String, required: true },
  product_id: { type: String, required: true },
  quantity: { type: Number, required: true },
  total_price: { type: Number, required: true },
  order_date: { type: Date, default: Date.now },
  status: { type: String, required: true, enum: ['pending', 'shipped', 'delivered', 'canceled'] }
});

export default mongoose.model<IOrder>('Order', OrderSchema);
