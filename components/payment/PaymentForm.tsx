"use client"

import { useState } from "react"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface PaymentFormProps {
  bookingId: string
  amount: number
  currency?: string
  onSuccess?: (confirmationCode: string) => void
  onError?: (error: string) => void
}

export function PaymentForm({
  bookingId,
  amount,
  currency = 'USD',
  onSuccess,
  onError,
}: PaymentFormProps) {
  const { t, isRTL } = useLanguage()
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank_transfer'>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // In a real implementation, you would integrate with Stripe/PayPal here
      // For now, we'll simulate payment processing
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId,
          paymentMethod,
          transactionId: `TXN-${Date.now()}`,
          amount,
          currency,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(t.common.success, {
          description: 'Payment processed successfully!',
        })
        onSuccess?.(data.data.confirmationCode)
      } else {
        throw new Error(data.error || 'Payment failed')
      }
    } catch (error: any) {
      toast.error(t.common.error, {
        description: error.message || 'Payment processing failed',
      })
      onError?.(error.message)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={isRTL ? 'text-right' : ''}>
          {t.booking.title} - {formatPrice(amount)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label className={isRTL ? 'text-right block' : ''}>Payment Method</Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as any)}
              className={isRTL ? 'flex-row-reverse' : ''}
            >
              <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="cursor-pointer">
                  Credit/Debit Card
                </Label>
              </div>
              <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="cursor-pointer">
                  PayPal
                </Label>
              </div>
              <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                <Label htmlFor="bank_transfer" className="cursor-pointer">
                  Bank Transfer
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName" className={isRTL ? 'text-right block' : ''}>
                  Cardholder Name
                </Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className={isRTL ? 'text-right block' : ''}>
                  Card Number
                </Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  maxLength={19}
                  required
                />
              </div>
              <div className={`grid grid-cols-2 gap-4 ${isRTL ? 'grid-flow-col-dense' : ''}`}>
                <div className="space-y-2">
                  <Label htmlFor="expiry" className={isRTL ? 'text-right block' : ''}>
                    Expiry Date
                  </Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    maxLength={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv" className={isRTL ? 'text-right block' : ''}>
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                You will be redirected to PayPal to complete your payment
              </p>
            </div>
          )}

          {paymentMethod === 'bank_transfer' && (
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <p className="text-sm font-medium">Bank Transfer Details</p>
              <p className="text-sm text-muted-foreground">
                Account Number: 123456789
                <br />
                Bank: National Bank of Egypt
                <br />
                SWIFT: NBELEGCA
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Please include your booking reference in the transfer notes
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'} animate-spin`} />
                {t.booking.processing}
              </>
            ) : (
              <>
                <CreditCard className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.booking.confirmAndPay}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
