/**
 * Payment gateway configuration
 * Supports Stripe and PayPal
 */

export type PaymentMethod = 'stripe' | 'paypal' | 'bank_transfer' | 'razorpay';

export interface PaymentConfig {
  stripe: {
    enabled: boolean;
    publishableKey: string;
    secretKey: string;
  };
  paypal: {
    enabled: boolean;
    clientId: string;
    clientSecret: string;
    environment: 'sandbox' | 'production';
  };
  razorpay: {
    enabled: boolean;
    keyId: string;
    keySecret: string;
  };
  currency: string;
  defaultCurrency: string;
}

export function getPaymentConfig(): PaymentConfig {
  return {
    stripe: {
      enabled: process.env.STRIPE_ENABLED === 'true',
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      secretKey: process.env.STRIPE_SECRET_KEY || '',
    },
    paypal: {
      enabled: process.env.PAYPAL_ENABLED === 'true',
      clientId: process.env.PAYPAL_CLIENT_ID || '',
      clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
      environment: (process.env.PAYPAL_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
    },
    razorpay: {
      enabled: true,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
      keySecret: process.env.RAZORPAY_SECRET_KEY || '',
    },
    currency: process.env.DEFAULT_CURRENCY || 'USD',
    defaultCurrency: 'USD',
  };
}

export function generateConfirmationCode(): string {
  const prefix = 'ICE';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}
