"use client"

import { useState, useEffect } from "react"
import { Car, Users, Clock, MapPin, Check, Plus, Plane, Building2, Anchor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { getLocalizedText } from "@/lib/i18n/utils"
import { cn } from "@/lib/utils"

interface Transfer {
  _id?: string
  nameEn: string
  nameAr: string
  descriptionEn: string
  descriptionAr: string
  fromLocationEn: string
  fromLocationAr: string
  toLocationEn: string
  toLocationAr: string
  type: 'airport' | 'hotel' | 'port' | 'custom'
  vehicleType: 'sedan' | 'van' | 'bus' | 'luxury'
  capacity: number
  price: number
  currency: string
  duration: number
  available: boolean
}

interface TransferSelectorProps {
  from?: string
  to?: string
  type?: 'airport' | 'hotel' | 'port' | 'custom'
  passengers?: number
  selectedTransfer?: Transfer | null
  onSelect: (transfer: Transfer | null) => void
  className?: string
}

export function TransferSelector({
  from,
  to,
  type,
  passengers = 1,
  selectedTransfer,
  onSelect,
  className,
}: TransferSelectorProps) {
  const { t, locale, isRTL } = useLanguage()
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTransfers = async () => {
      setLoading(true)
      try {
        const queryParams = new URLSearchParams({ available: 'true' })
        if (from) queryParams.append('from', from)
        if (to) queryParams.append('to', to)
        if (type) queryParams.append('type', type)
        if (passengers) queryParams.append('minCapacity', passengers.toString())

        const response = await fetch(`/api/transfers?${queryParams}`)
        const data = await response.json()
        
        if (data.success) {
          setTransfers(data.data || [])
        }
      } catch (error) {
        console.error('Error fetching transfers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransfers()
  }, [from, to, type, passengers])

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getTypeIcon = (transferType: string) => {
    switch (transferType) {
      case 'airport':
        return Plane
      case 'hotel':
        return Building2
      case 'port':
        return Anchor
      default:
        return Car
    }
  }

  const getVehicleLabel = (vehicleType: string) => {
    const labels: Record<string, string> = {
      sedan: 'Sedan',
      van: 'Van',
      bus: 'Bus',
      luxury: 'Luxury Vehicle'
    }
    return labels[vehicleType] || vehicleType
  }

  const getName = (transfer: Transfer) => {
    return getLocalizedText(transfer.nameEn, transfer.nameAr, locale)
  }

  const getDescription = (transfer: Transfer) => {
    return getLocalizedText(transfer.descriptionEn, transfer.descriptionAr, locale)
  }

  const getFromLocation = (transfer: Transfer) => {
    return getLocalizedText(transfer.fromLocationEn, transfer.fromLocationAr, locale)
  }

  const getToLocation = (transfer: Transfer) => {
    return getLocalizedText(transfer.toLocationEn, transfer.toLocationAr, locale)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h3 className="font-serif text-xl font-semibold text-foreground">
          {t.booking.transfer || 'Select Transfer'}
        </h3>
        {selectedTransfer && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSelect(null)}
            className={isRTL ? 'flex-row-reverse' : ''}
          >
            {t.common.remove || 'Remove'}
          </Button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">
          {t.common.loading || 'Loading transfers...'}
        </div>
      ) : transfers.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {t.common.noResults || 'No transfers found'}
        </div>
      ) : (
        <div className="space-y-3">
          {transfers.map((transfer) => {
            const isSelected = selectedTransfer?._id === transfer._id
            const TypeIcon = getTypeIcon(transfer.type)
            
            return (
              <Card
                key={transfer._id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  isSelected && "ring-2 ring-primary"
                )}
                onClick={() => onSelect(isSelected ? null : transfer)}
              >
                <CardContent className="p-4">
                  <div className={`flex items-center justify-between gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <TypeIcon className="h-5 w-5 text-primary shrink-0" />
                        <h4 className="font-semibold text-foreground">{getName(transfer)}</h4>
                        <Badge variant="outline" className="shrink-0">
                          {getVehicleLabel(transfer.vehicleType)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span>{getFromLocation(transfer)} → {getToLocation(transfer)}</span>
                        </div>
                        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Users className="h-3 w-3 shrink-0" />
                            <span>{transfer.capacity} {t.common.guests || 'guests'}</span>
                          </div>
                          <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Clock className="h-3 w-3 shrink-0" />
                            <span>{transfer.duration} min</span>
                          </div>
                        </div>
                        {getDescription(transfer) && (
                          <p className="text-xs mt-2 line-clamp-2">{getDescription(transfer)}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className={`text-right shrink-0 ${isRTL ? 'text-left' : ''}`}>
                      <div className="text-lg font-semibold text-foreground">
                        {formatPrice(transfer.price, transfer.currency)}
                      </div>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelect(isSelected ? null : transfer)
                        }}
                        className={cn(
                          "mt-2",
                          isSelected && "bg-destructive hover:bg-destructive/90"
                        )}
                      >
                        {isSelected ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            {t.common.selected || 'Selected'}
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            {t.common.select || 'Select'}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

