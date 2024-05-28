import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  createdat: Date;
  updatedat: Date;
  avatar?: string;
  role: string | string[];

}

const UserSchema: Schema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  createdat: { type: Date, default: Date.now },
  updatedat: { type: Date, default: Date.now },
  avatar: { type: String, default: '/uploads/default_avatar.png' },
  role: { type: String, enum: ['buyer', 'seller','admin'], default: 'buyer' }
});

export default mongoose.model<IUser>('User', UserSchema);
