import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  buyer_id: string;
  sellerId: string;
  product_id: string;
  total_price: number;
  order_date: Date;
  status: 'Proses' | 'Selesai' | 'Batal';
}

const OrderSchema: Schema = new Schema({
  buyer_id: { type: String, required: true },
  sellerId: { type: String, required: true },
  product_id: { type: String, required: true },
  total_price: { type: Number, required: true },
  order_date: { type: Date, default: Date.now },
  status: { type: String, default: 'Proses', enum: ['Proses', 'Selesai', 'Batal'] }
});


export default mongoose.model<IOrder>('Order', OrderSchema);
