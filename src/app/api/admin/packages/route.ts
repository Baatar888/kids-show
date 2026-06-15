import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Package from '@/models/Package';
import { verifyToken } from '@/lib/auth';

function isAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  return token ? verifyToken(token) : null;
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Зөвшөөрөлгүй' }, { status: 401 });
  await connectDB();
  const packages = await Package.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json(packages);
}
