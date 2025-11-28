"use client"

import { BadgeCheck, Lock, Headphones } from "lucide-react"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function GuaranteeBanner() {
  const { t, isRTL } = useLanguage()

  const guarantees = [
    {
      icon: Lock,
      title: t.trust.guaranteedConfirmation,
      description: "Your booking is confirmed instantly",
    },
    {
      icon: BadgeCheck,
      title: t.trust.allInclusivePricing,
      description: "No hidden fees or surprises",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Available before, during, and after your trip",
    },
  ]

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-6">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isRTL ? 'md:grid-flow-col-dense' : ''}`}>
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon
            return (
              <div
                key={index}
                className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className={cn("space-y-1", isRTL && 'text-right')}>
                  <h4 className="font-semibold text-sm">{guarantee.title}</h4>
                  <p className="text-xs text-muted-foreground">{guarantee.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
