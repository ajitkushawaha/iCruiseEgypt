import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Commission from '@/models/Commission';
import Booking from '@/models/Booking';

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const searchParams = request.nextUrl.searchParams;
        const partnerId = searchParams.get('partnerId');
        const status = searchParams.get('status');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        // Build query
        const query: any = {};

        if (partnerId) {
            query.partnerId = partnerId;
        }

        if (status && ['pending', 'approved', 'paid', 'cancelled'].includes(status)) {
            query.status = status;
        }

        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const commissions = await Commission.find(query)
            .populate('bookingId')
            .populate('cruiseId')
            .sort({ createdAt: -1 });

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
        await connectDB();

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

        const commission = await Commission.create({
            partnerId: body.partnerId,
            bookingId: body.bookingId,
            cruiseId: body.cruiseId,
            amount: body.amount,
            commissionRate: body.commissionRate,
            commissionAmount,
            currency: body.currency || 'USD',
            status: body.status || 'pending',
            notes: body.notes,
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
        await connectDB();

        const booking = await Booking.findById(bookingId);
        if (!booking || booking.status !== 'confirmed') {
            return null;
        }

        // Check if commission already exists
        const existingCommission = await Commission.findOne({
            bookingId,
            partnerId,
        });

        if (existingCommission) {
            return existingCommission;
        }

        const totalAmount = booking.totalAmount || 0;
        const commissionAmount = (totalAmount * commissionRate) / 100;

        const commission = await Commission.create({
            partnerId,
            bookingId,
            cruiseId: booking.cruiseId,
            amount: totalAmount,
            commissionRate,
            commissionAmount,
            currency: booking.currency || 'USD',
            status: 'pending',
        });

        return commission;
    } catch (error: any) {
        console.error('Error calculating commission:', error);
        return null;
    }
}

