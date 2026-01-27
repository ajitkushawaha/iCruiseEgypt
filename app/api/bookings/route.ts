import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateConfirmationCode } from '@/lib/payments/config';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Generate confirmation code
        const confirmationCode = generateConfirmationCode();

        // Create booking
        const booking = await prisma.booking.create({
            data: {
                cruiseId: body.cruiseId,
                cruiseName: body.cruiseName,
                name: body.name,
                email: body.email,
                phone: body.phone,
                date: new Date(body.date),
                guests: parseInt(body.guests),
                status: 'pending',
                confirmationCode,
                paymentStatus: 'pending',
                totalAmount: body.totalAmount,
                currency: body.currency || 'USD',
            }
        });

        return NextResponse.json({ 
            success: true, 
            data: booking
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const bookings = await prisma.booking.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ success: true, data: bookings });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
