"use client"

import { useLanguage } from "@/components/i18n/LanguageProvider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface PricingBreakdownProps {
  basePrice: number
  taxes?: number
  fees?: number
  discount?: number
  total: number
  currency?: string
}

export function PricingBreakdown({
  basePrice,
  taxes = 0,
  fees = 0,
  discount = 0,
  total,
  currency = "USD",
}: PricingBreakdownProps) {
  const { t, isRTL } = useLanguage()

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={isRTL ? 'text-right' : ''}>{t.booking.priceBreakdown}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-muted-foreground">{t.booking.basePrice}</span>
          <span className="font-medium">{formatPrice(basePrice)}</span>
        </div>
        
        {taxes > 0 && (
          <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-muted-foreground">{t.booking.taxes}</span>
            <span className="font-medium">{formatPrice(taxes)}</span>
          </div>
        )}
        
        {fees > 0 && (
          <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-muted-foreground">Service Fees</span>
            <span className="font-medium">{formatPrice(fees)}</span>
          </div>
        )}
        
        {discount > 0 && (
          <div className={`flex justify-between items-center text-green-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span>Discount</span>
            <span className="font-medium">-{formatPrice(discount)}</span>
          </div>
        )}
        
        <Separator />
        
        <div className={`flex justify-between items-center text-lg font-bold ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span>{t.booking.total}</span>
          <span>{formatPrice(total)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
