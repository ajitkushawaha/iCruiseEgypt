/**
 * Payment gateway configuration
 * Supports Stripe and PayPal
 */

export type PaymentMethod = 'stripe' | 'paypal' | 'bank_transfer';

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
