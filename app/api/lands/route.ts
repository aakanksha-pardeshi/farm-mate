import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Land from '@/models/Land';

export async function GET() {
    try {
        await dbConnect();
        const lands = await Land.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: lands });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const land = await Land.create(body);
        return NextResponse.json({ success: true, data: land }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}
