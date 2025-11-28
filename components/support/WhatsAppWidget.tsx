"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { cn } from "@/lib/utils"

interface WhatsAppWidgetProps {
  phoneNumber?: string
  message?: string
}

export function WhatsAppWidget({ 
  phoneNumber = "+201234567890",
  message = "Hello, I need assistance with my booking"
}: WhatsAppWidgetProps) {
  const { t, isRTL } = useLanguage()

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className={cn(
        "fixed bottom-6 z-50 rounded-full shadow-lg hover:scale-110 transition-transform",
        isRTL ? "left-6" : "right-6"
      )}
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="h-6 w-6 mr-2" />
      <span className="hidden sm:inline">WhatsApp</span>
    </Button>
  )
}
