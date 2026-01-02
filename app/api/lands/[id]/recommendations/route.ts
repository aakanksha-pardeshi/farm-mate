import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Land from '@/models/Land';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    try {
        const currentLand = await Land.findById(params.id);
        if (!currentLand) {
            return NextResponse.json({ success: false, error: 'Land not found' }, { status: 404 });
        }

        // Find similar lands:
        // 1. Same location (priority)
        // 2. Similar size (+/- 20%)
        // 3. Same soil type
        const similarLands = await Land.find({
            _id: { $ne: params.id },
            $or: [
                { landLocation: currentLand.landLocation },
                { soilType: currentLand.soilType },
                {
                    landSize: {
                        $gte: currentLand.landSize * 0.8,
                        $lte: currentLand.landSize * 1.2,
                    },
                },
            ],
        }).limit(4);

        return NextResponse.json({ success: true, data: similarLands });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}
