import mongoose, { Schema, Document } from 'mongoose';

export interface IChatMessage extends Document {
  sessionId: string;
  senderName: string;
  phone: string;
  messages: { role: 'user' | 'admin'; text: string; time: Date }[];
  isRead: boolean;
  createdAt: Date;
}

const ChatSchema = new Schema<IChatMessage>({
  sessionId: { type: String, required: true, unique: true },
  senderName: { type: String, default: 'Зочин' },
  phone: { type: String, default: '' },
  messages: [{
    role: { type: String, enum: ['user', 'admin'] },
    text: { type: String },
    time: { type: Date, default: Date.now },
  }],
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Chat || mongoose.model<IChatMessage>('Chat', ChatSchema);
