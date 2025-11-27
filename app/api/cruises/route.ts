import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Cruise from '@/models/Cruise';

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const searchParams = request.nextUrl.searchParams;
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const duration = searchParams.get('duration');
        const destination = searchParams.get('destination');

        // Build query
        const query: any = {};

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseInt(minPrice);
            if (maxPrice) query.price.$lte = parseInt(maxPrice);
        }

        if (duration) {
            // Duration filter (e.g., "3-4 Nights")
            query.duration = { $regex: duration, $options: 'i' };
        }

        if (destination) {
            // Destination filter (e.g., "Luxor", "Aswan")
            query.route = { $regex: destination, $options: 'i' };
        }

        const cruises = await Cruise.find(query).sort({ rating: -1 });

        return NextResponse.json({ success: true, data: cruises });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const cruise = await Cruise.create(body);

        return NextResponse.json({ success: true, data: cruise }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
