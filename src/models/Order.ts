import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  name: string;
  phone: string;
  email?: string;
  packageId?: string;
  packageTitle?: string;
  eventDate: string;
  guestCount: number;
  message: string;
  status: 'new' | 'contacted' | 'confirmed' | 'done' | 'cancelled';
  source: 'phone' | 'chat' | 'form';
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  packageId: { type: String },
  packageTitle: { type: String },
  eventDate: { type: String, required: true },
  guestCount: { type: Number, default: 20 },
  message: { type: String, default: '' },
  status: { type: String, enum: ['new', 'contacted', 'confirmed', 'done', 'cancelled'], default: 'new' },
  source: { type: String, enum: ['phone', 'chat', 'form'], default: 'form' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
