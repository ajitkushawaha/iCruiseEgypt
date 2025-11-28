import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { generateConfirmationCode } from '@/lib/payments/config';

/**
 * Process payment and update booking
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      bookingId,
      paymentMethod,
      transactionId,
      amount,
      currency = 'USD',
    } = body;

    // Validate input
    if (!bookingId || !paymentMethod || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Generate confirmation code if not exists
    if (!booking.confirmationCode) {
      booking.confirmationCode = generateConfirmationCode();
    }

    // Update payment information
    booking.paymentStatus = 'paid';
    booking.paymentMethod = paymentMethod;
    booking.transactionId = transactionId;
    booking.totalAmount = amount;
    booking.currency = currency;
    booking.paidAmount = amount;
    booking.status = 'confirmed';

    await booking.save();

    return NextResponse.json({
      success: true,
      data: {
        bookingId: booking._id,
        confirmationCode: booking.confirmationCode,
        paymentStatus: booking.paymentStatus,
      },
    });
  } catch (error: any) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Payment processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Get payment status for a booking
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');
    const confirmationCode = searchParams.get('confirmationCode');

    if (!bookingId && !confirmationCode) {
      return NextResponse.json(
        { success: false, error: 'Booking ID or confirmation code required' },
        { status: 400 }
      );
    }

    let booking;
    if (bookingId) {
      booking = await Booking.findById(bookingId);
    } else if (confirmationCode) {
      booking = await Booking.findOne({ confirmationCode });
    }

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        bookingId: booking._id,
        confirmationCode: booking.confirmationCode,
        paymentStatus: booking.paymentStatus,
        totalAmount: booking.totalAmount,
        currency: booking.currency,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
