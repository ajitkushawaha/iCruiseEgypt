import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateConfirmationCode } from '@/lib/payments/config';

/**
 * Process payment and update booking
 */
export async function POST(request: NextRequest) {
  try {
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
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });
    
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Generate confirmation code if not exists
    let confirmationCode = booking.confirmationCode;
    if (!confirmationCode) {
      confirmationCode = generateConfirmationCode();
    }

    // Update payment information
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: 'paid',
        paymentMethod,
        transactionId,
        totalAmount: amount,
        currency,
        paidAmount: amount,
        status: 'confirmed',
        confirmationCode
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        bookingId: updatedBooking.id,
        confirmationCode: updatedBooking.confirmationCode,
        paymentStatus: updatedBooking.paymentStatus,
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
      booking = await prisma.booking.findUnique({
        where: { id: bookingId }
      });
    } else if (confirmationCode) {
      booking = await prisma.booking.findFirst({
        where: { confirmationCode }
      });
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
        bookingId: booking.id,
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
