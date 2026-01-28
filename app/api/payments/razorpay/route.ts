import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getPaymentConfig } from '@/lib/payments/config';

const config = getPaymentConfig();
const razorpay = new Razorpay({
  key_id: config.razorpay.keyId,
  key_secret: config.razorpay.keySecret,
});

export async function POST(request: NextRequest) {
  try {
    const { amount, bookingId, currency = 'INR' } = await request.json();

    if (!amount || !bookingId) {
      return NextResponse.json(
        { success: false, error: 'Missing amount or bookingId' },
        { status: 400 }
      );
    }

    // Razorpay expects amount in paise (multiply by 100)
    // For USD, it's cents
    const options = {
      amount: Math.round(amount * 100),
      currency: currency,
      receipt: bookingId.slice(-40), // Ensure length is within 40 characters
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create Razorpay order' },
      { status: 500 }
    );
  }
}
