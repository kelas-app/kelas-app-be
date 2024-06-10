import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  buyerId: string;
  sellerId: string;
  productId: string;
  totalPrice: number;
  order_date: Date;
  status: 'Proses' | 'Selesai' | 'Batal';
}

const OrderSchema: Schema = new Schema({
  buyerId: { type: String, required: true },
  sellerId: { type: String, required: true },
  productId: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  order_date: { type: Date, default: Date.now },
  status: { type: String, default: 'Proses', enum: ['Proses', 'Selesai', 'Batal'] }
});


export default mongoose.model<IOrder>('Order', OrderSchema);
