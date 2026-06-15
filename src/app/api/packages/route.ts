import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Package from '@/models/Package';
import { verifyToken } from '@/lib/auth';

function isAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  return token ? verifyToken(token) : null;
}

export async function GET() {
  await connectDB();
  const packages = await Package.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  return NextResponse.json(packages);
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Зөвшөөрөлгүй' }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const pkg = await Package.create(body);
  return NextResponse.json(pkg, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Зөвшөөрөлгүй' }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const { _id, ...data } = body;
  const pkg = await Package.findByIdAndUpdate(_id, data, { new: true });
  return NextResponse.json(pkg);
}

export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Зөвшөөрөлгүй' }, { status: 401 });
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await Package.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
