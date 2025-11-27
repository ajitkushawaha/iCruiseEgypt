import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();

        // Create booking
        const booking = await Booking.create({
            cruiseId: body.cruiseId,
            cruiseName: body.cruiseName,
            name: body.name,
            email: body.email,
            phone: body.phone,
            date: new Date(body.date),
            guests: parseInt(body.guests),
            status: 'pending',
        });

        return NextResponse.json({ success: true, data: booking }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const bookings = await Booking.find().sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: bookings });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
