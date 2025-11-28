"use client"

import { Shield, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { cn } from "@/lib/utils"

interface SecureBadgeProps {
  variant?: 'default' | 'large' | 'compact'
  className?: string
}

export function SecureBadge({ variant = 'default', className }: SecureBadgeProps) {
  const { t, isRTL } = useLanguage()

  const variants = {
    default: "flex items-center gap-2 text-sm text-muted-foreground",
    large: "flex items-center gap-3 text-base font-medium",
    compact: "flex items-center gap-1.5 text-xs text-muted-foreground",
  }

  return (
    <div className={cn(variants[variant], isRTL && 'flex-row-reverse', className)}>
      <Shield className="h-4 w-4 text-primary shrink-0" />
      <span>{t.trust.securePayment}</span>
    </div>
  )
}

export function LicensedBadge({ variant = 'default', className }: SecureBadgeProps) {
  const { t, isRTL } = useLanguage()

  const variants = {
    default: "flex items-center gap-2 text-sm text-muted-foreground",
    large: "flex items-center gap-3 text-base font-medium",
    compact: "flex items-center gap-1.5 text-xs text-muted-foreground",
  }

  return (
    <div className={cn(variants[variant], isRTL && 'flex-row-reverse', className)}>
      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
      <span>{t.trust.licensedOperator}</span>
    </div>
  )
}
