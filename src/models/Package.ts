import mongoose, { Schema, Document } from 'mongoose';

export interface IPackage extends Document {
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  images: string[];
  video?: string;
  features: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
}

const PackageSchema = new Schema<IPackage>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, default: '2 цаг' },
  category: { type: String, required: true },
  images: [{ type: String }],
  video: { type: String },
  features: [{ type: String }],
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Package || mongoose.model<IPackage>('Package', PackageSchema);
