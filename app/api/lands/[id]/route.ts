import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Land from '@/models/Land';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const land = await Land.findById(params.id);
        if (!land) {
            return NextResponse.json({ success: false, error: 'Land not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: land });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const body = await request.json();
        const land = await Land.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });
        if (!land) {
            return NextResponse.json({ success: false, error: 'Land not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: land });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const deletedLand = await Land.deleteOne({ _id: params.id });
        if (!deletedLand) {
            return NextResponse.json({ success: false, error: 'Land not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}
