"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MapPin, Star, Wifi, Car, Utensils, Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { getLocalizedText } from "@/lib/i18n/utils"
import { cn } from "@/lib/utils"

interface Hotel {
  _id?: string
  nameEn: string
  nameAr: string
  descriptionEn: string
  descriptionAr: string
  locationEn: string
  locationAr: string
  images: string[]
  rating: number
  amenities: string[]
  pricePerNight: number
  currency: string
  starRating: number
}

interface HotelAddonSelectorProps {
  city?: string
  checkIn?: string
  checkOut?: string
  nights?: number
  selectedHotel?: Hotel | null
  onSelect: (hotel: Hotel | null) => void
  className?: string
}

export function HotelAddonSelector({
  city,
  checkIn,
  checkOut,
  nights = 1,
  selectedHotel,
  onSelect,
  className,
}: HotelAddonSelectorProps) {
  const { t, locale, isRTL } = useLanguage()
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(false)
  const [expandedHotel, setExpandedHotel] = useState<string | null>(null)

  useEffect(() => {
    const fetchHotels = async () => {
      if (!city) return
      
      setLoading(true)
      try {
        const queryParams = new URLSearchParams({ city, available: 'true' })
        const response = await fetch(`/api/hotels?${queryParams}`)
        const data = await response.json()
        
        if (data.success) {
          setHotels(data.data || [])
        }
      } catch (error) {
        console.error('Error fetching hotels:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [city])

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getTotalPrice = (hotel: Hotel) => {
    return hotel.pricePerNight * nights
  }

  const getName = (hotel: Hotel) => {
    return getLocalizedText(hotel.nameEn, hotel.nameAr, locale)
  }

  const getDescription = (hotel: Hotel) => {
    return getLocalizedText(hotel.descriptionEn, hotel.descriptionAr, locale)
  }

  const getLocation = (hotel: Hotel) => {
    return getLocalizedText(hotel.locationEn, hotel.locationAr, locale)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h3 className="font-serif text-xl font-semibold text-foreground">
          {city ? `${t.booking.addHotel || 'Add Hotel'} - ${city}` : t.booking.selectHotel || 'Select Hotel'}
        </h3>
        {selectedHotel && (
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
          {t.common.loading || 'Loading hotels...'}
        </div>
      ) : hotels.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {t.common.noResults || 'No hotels found for this location'}
        </div>
      ) : (
        <div className="space-y-3">
          {hotels.map((hotel) => {
            const isSelected = selectedHotel?._id === hotel._id
            const isExpanded = expandedHotel === hotel._id
            
            return (
              <Card
                key={hotel._id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  isSelected && "ring-2 ring-primary"
                )}
                onClick={() => !isExpanded && setExpandedHotel(hotel._id || null)}
              >
                <CardContent className="p-4">
                  <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {hotel.images?.[0] && (
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={hotel.images[0]}
                          alt={getName(hotel)}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-start justify-between gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="flex-1">
                          <div className={`flex items-center gap-2 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <h4 className="font-semibold text-foreground">{getName(hotel)}</h4>
                            <Badge variant="outline" className="shrink-0">
                              {hotel.starRating}★
                            </Badge>
                          </div>
                          <div className={`flex items-center gap-2 text-sm text-muted-foreground mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="truncate">{getLocation(hotel)}</span>
                          </div>
                          <div className={`flex items-center gap-4 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{hotel.rating.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {hotel.amenities?.slice(0, 3).map((amenity, idx) => {
                                const Icon = amenity.toLowerCase().includes('wifi') ? Wifi :
                                            amenity.toLowerCase().includes('parking') ? Car :
                                            amenity.toLowerCase().includes('restaurant') ? Utensils : null
                                return Icon ? (
                                  <Icon key={idx} className="h-3 w-3 text-muted-foreground" />
                                ) : null
                              })}
                            </div>
                          </div>
                        </div>
                        
                        <div className={`text-right shrink-0 ${isRTL ? 'text-left' : ''}`}>
                          <div className="text-sm text-muted-foreground">
                            {formatPrice(hotel.pricePerNight, hotel.currency)}/{t.common.perNight || 'night'}
                          </div>
                          {nights > 1 && (
                            <div className="text-lg font-semibold text-foreground">
                              {formatPrice(getTotalPrice(hotel), hotel.currency)} total
                            </div>
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-border space-y-3">
                          <p className="text-sm text-muted-foreground">{getDescription(hotel)}</p>
                          
                          {hotel.amenities && hotel.amenities.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium mb-2">{t.common.amenities || 'Amenities'}</h5>
                              <div className="flex flex-wrap gap-2">
                                {hotel.amenities.map((amenity, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              onSelect(isSelected ? null : hotel)
                              setExpandedHotel(null)
                            }}
                            className={cn(
                              "w-full",
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
                                {t.common.select || 'Select Hotel'}
                              </>
                            )}
                          </Button>
                        </div>
                      )}
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

