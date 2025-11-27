import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Cruise from '@/models/Cruise';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        const cruise = await Cruise.findById(id);

        if (!cruise) {
            return NextResponse.json(
                { success: false, error: 'Cruise not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: cruise });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
