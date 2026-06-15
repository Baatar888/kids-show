import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Chat from '@/models/Chat';
import { verifyToken } from '@/lib/auth';

function isAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  return token ? verifyToken(token) : null;
}

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');

  if (isAdmin(req)) {
    // Admin gets all chats
    const chats = await Chat.find().sort({ createdAt: -1 });
    return NextResponse.json(chats);
  }

  if (!sessionId) return NextResponse.json({ messages: [] });

  let chat = await Chat.findOne({ sessionId });
  if (!chat) {
    chat = await Chat.create({ sessionId, messages: [] });
  }
  return NextResponse.json(chat);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { sessionId, text, role, senderName, phone } = body;

  let chat = await Chat.findOne({ sessionId });
  if (!chat) {
    chat = await Chat.create({
      sessionId,
      senderName: senderName || 'Зочин',
      phone: phone || '',
      messages: [],
    });
  }

  if (senderName) chat.senderName = senderName;
  if (phone) chat.phone = phone;

  chat.messages.push({ role: role || 'user', text, time: new Date() });
  if (role === 'admin') {
    chat.isRead = true;
  } else {
    chat.isRead = false;
  }

  await chat.save();
  return NextResponse.json(chat);
}
