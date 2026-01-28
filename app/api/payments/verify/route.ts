import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { getPaymentConfig } from '@/lib/payments/config';

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = await request.json();

    const config = getPaymentConfig();
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", config.razorpay.keySecret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update booking in database
      const booking = await (prisma.booking as any).findUnique({ where: { id: bookingId } });
      const updatedBooking = await (prisma.booking as any).update({
        where: { id: bookingId },
        data: {
          status: 'confirmed',
          paymentStatus: 'paid',
          transactionId: razorpay_payment_id,
          paymentMethod: 'razorpay',
          paidAmount: booking?.totalAmount,
        },
      });

      return NextResponse.json({
        success: true,
        confirmationCode: updatedBooking.confirmationCode,
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
