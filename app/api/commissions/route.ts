import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const partnerId = searchParams.get('partnerId');
        const status = searchParams.get('status');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        // Build query
        const where: any = {};

        if (partnerId) {
            where.partnerId = partnerId;
        }

        if (status && ['pending', 'approved', 'paid', 'cancelled'].includes(status)) {
            where.status = status;
        }

        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) where.createdAt.gte = new Date(startDate);
            if (endDate) where.createdAt.lte = new Date(endDate);
        }

        const commissions = await prisma.commission.findMany({
            where,
            include: {
                booking: true,
                cruise: true,
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ success: true, data: commissions });
    } catch (error: any) {
        console.error('Error fetching commissions:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.partnerId || !body.bookingId || !body.amount || body.commissionRate === undefined) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Calculate commission amount
        const commissionAmount = (body.amount * body.commissionRate) / 100;

        const commission = await prisma.commission.create({
            data: {
                partnerId: body.partnerId,
                bookingId: body.bookingId,
                cruiseId: body.cruiseId,
                amount: body.amount,
                commissionRate: body.commissionRate,
                commissionAmount,
                currency: body.currency || 'USD',
                status: body.status || 'pending',
                notes: body.notes,
            }
        });

        return NextResponse.json(
            { success: true, data: commission },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating commission:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

// Calculate and create commission when booking is confirmed
export async function calculateCommission(bookingId: string, partnerId: string, commissionRate: number = 10) {
    try {
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId }
        });
        
        if (!booking || booking.status !== 'confirmed') {
            return null;
        }

        // Check if commission already exists
        const existingCommission = await prisma.commission.findFirst({
            where: {
                bookingId,
                partnerId,
            }
        });

        if (existingCommission) {
            return existingCommission;
        }

        const totalAmount = booking.totalAmount || 0;
        const commissionAmount = (totalAmount * commissionRate) / 100;

        const commission = await prisma.commission.create({
            data: {
                partnerId,
                bookingId,
                cruiseId: booking.cruiseId,
                amount: totalAmount,
                commissionRate,
                commissionAmount,
                currency: booking.currency || 'USD',
                status: 'pending',
            }
        });

        return commission;
    } catch (error: any) {
        console.error('Error calculating commission:', error);
        return null;
    }
}

