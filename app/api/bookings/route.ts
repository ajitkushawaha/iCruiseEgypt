import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateConfirmationCode } from '@/lib/payments/config';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const session = await getServerSession(authOptions);

        // Generate confirmation code
        const confirmationCode = generateConfirmationCode();

        // Create booking
        const booking = await (prisma.booking as any).create({
            data: {
                cruiseId: body.cruiseId,
                cruiseName: body.cruiseName,
                userId: (session?.user as any)?.id || null,
                name: body.name,
                email: body.email,
                phone: body.phone,
                date: new Date(body.date),
                guests: Number.parseInt(body.guests),
                status: 'pending',
                confirmationCode,
                paymentStatus: 'pending',
                totalAmount: body.totalAmount,
                currency: body.currency || 'INR',
            }
        });

        return NextResponse.json({ 
            success: true, 
            data: booking
        }, { status: 201 });
    } catch (error: any) {
        console.error("Booking creation error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        
        const where = session?.user?.email 
            ? { email: session.user.email } 
            : {};

        const bookings = await (prisma.booking as any).findMany({
            where,
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
