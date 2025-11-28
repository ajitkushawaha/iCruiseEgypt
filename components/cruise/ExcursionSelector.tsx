"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Clock, MapPin, Users, Star, Check, Plus, Camera, Mountain, Building2, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { getLocalizedText } from "@/lib/i18n/utils"
import { cn } from "@/lib/utils"

interface Tour {
  _id?: string
  nameEn: string
  nameAr: string
  descriptionEn: string
  descriptionAr: string
  images: string[]
  duration: string
  durationHours: number
  price: number
  currency: string
  category: 'historical' | 'adventure' | 'cultural' | 'leisure' | 'photography'
  locationEn: string
  locationAr: string
  itinerary: Array<{
    time: string
    activityEn: string
    activityAr: string
  }>
  includes: string[]
  excludes: string[]
  meetingPointEn: string
  meetingPointAr: string
  available: boolean
  maxParticipants: number
  rating: number
}

interface ExcursionSelectorProps {
  location?: string
  category?: 'historical' | 'adventure' | 'cultural' | 'leisure' | 'photography'
  selectedTours?: Tour[]
  onSelect: (tours: Tour[]) => void
  className?: string
}

export function ExcursionSelector({
  location,
  category,
  selectedTours = [],
  onSelect,
  className,
}: ExcursionSelectorProps) {
  const { t, locale, isRTL } = useLanguage()
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(false)
  const [expandedTour, setExpandedTour] = useState<string | null>(null)

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true)
      try {
        const queryParams = new URLSearchParams({ available: 'true' })
        if (location) queryParams.append('location', location)
        if (category) queryParams.append('category', category)

        const response = await fetch(`/api/tours?${queryParams}`)
        const data = await response.json()
        
        if (data.success) {
          setTours(data.data || [])
        }
      } catch (error) {
        console.error('Error fetching tours:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [location, category])

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'historical':
        return Building2
      case 'adventure':
        return Mountain
      case 'photography':
        return Camera
      case 'leisure':
        return Waves
      default:
        return Camera
    }
  }

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      historical: 'Historical',
      adventure: 'Adventure',
      cultural: 'Cultural',
      leisure: 'Leisure',
      photography: 'Photography'
    }
    return labels[cat] || cat
  }

  const getName = (tour: Tour) => {
    return getLocalizedText(tour.nameEn, tour.nameAr, locale)
  }

  const getDescription = (tour: Tour) => {
    return getLocalizedText(tour.descriptionEn, tour.descriptionAr, locale)
  }

  const getLocation = (tour: Tour) => {
    return getLocalizedText(tour.locationEn, tour.locationAr, locale)
  }

  const getMeetingPoint = (tour: Tour) => {
    return getLocalizedText(tour.meetingPointEn, tour.meetingPointAr, locale)
  }

  const toggleTour = (tour: Tour) => {
    const isSelected = selectedTours.some(t => t._id === tour._id)
    if (isSelected) {
      onSelect(selectedTours.filter(t => t._id !== tour._id))
    } else {
      onSelect([...selectedTours, tour])
    }
  }

  const isTourSelected = (tour: Tour) => {
    return selectedTours.some(t => t._id === tour._id)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h3 className="font-serif text-xl font-semibold text-foreground">
          {t.booking.excursions || 'Select Excursions'}
        </h3>
        {selectedTours.length > 0 && (
          <Badge variant="secondary">
            {selectedTours.length} {t.common.selected || 'selected'}
          </Badge>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">
          {t.common.loading || 'Loading excursions...'}
        </div>
      ) : tours.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {t.common.noResults || 'No excursions found'}
        </div>
      ) : (
        <div className="space-y-3">
          {tours.map((tour) => {
            const isSelected = isTourSelected(tour)
            const isExpanded = expandedTour === tour._id
            const CategoryIcon = getCategoryIcon(tour.category)
            
            return (
              <Card
                key={tour._id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  isSelected && "ring-2 ring-primary"
                )}
                onClick={() => !isExpanded && setExpandedTour(tour._id || null)}
              >
                <CardContent className="p-4">
                  <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {tour.images?.[0] && (
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={tour.images[0]}
                          alt={getName(tour)}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-start justify-between gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="flex-1">
                          <div className={`flex items-center gap-2 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <CategoryIcon className="h-4 w-4 text-primary shrink-0" />
                            <h4 className="font-semibold text-foreground">{getName(tour)}</h4>
                            <Badge variant="outline" className="shrink-0">
                              {getCategoryLabel(tour.category)}
                            </Badge>
                          </div>
                          <div className={`flex items-center gap-2 text-sm text-muted-foreground mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="truncate">{getLocation(tour)}</span>
                          </div>
                          <div className={`flex items-center gap-4 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <Clock className="h-3 w-3 shrink-0" />
                              <span>{tour.duration}</span>
                            </div>
                            <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <Users className="h-3 w-3 shrink-0" />
                              <span>Up to {tour.maxParticipants}</span>
                            </div>
                            {tour.rating > 0 && (
                              <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{tour.rating.toFixed(1)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className={`text-right shrink-0 ${isRTL ? 'text-left' : ''}`}>
                          <div className="text-lg font-semibold text-foreground">
                            {formatPrice(tour.price, tour.currency)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {t.common.perPerson || 'per person'}
                          </div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-border space-y-3">
                          <p className="text-sm text-muted-foreground">{getDescription(tour)}</p>
                          
                          {tour.itinerary && tour.itinerary.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium mb-2">{t.booking.itinerary || 'Itinerary'}</h5>
                              <div className="space-y-1">
                                {tour.itinerary.map((item, idx) => {
                                  const activity = getLocalizedText(item.activityEn, item.activityAr, locale)
                                  return (
                                    <div key={idx} className="text-xs text-muted-foreground flex gap-2">
                                      <span className="font-medium shrink-0">{item.time}</span>
                                      <span>{activity}</span>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )}

                          {tour.includes && tour.includes.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium mb-1">{t.booking.includes || 'Includes'}</h5>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {tour.includes.map((item, idx) => (
                                  <li key={idx} className="flex items-center gap-2">
                                    <Check className="h-3 w-3 shrink-0 text-green-600" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {tour.meetingPointEn && (
                            <div className="text-xs text-muted-foreground">
                              <span className="font-medium">{t.booking.meetingPoint || 'Meeting Point'}: </span>
                              {getMeetingPoint(tour)}
                            </div>
                          )}

                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleTour(tour)
                              setExpandedTour(null)
                            }}
                            className={cn(
                              "w-full",
                              isSelected && "bg-destructive hover:bg-destructive/90"
                            )}
                          >
                            {isSelected ? (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                {t.common.remove || 'Remove from Selection'}
                              </>
                            ) : (
                              <>
                                <Plus className="h-4 w-4 mr-2" />
                                {t.common.add || 'Add Excursion'}
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

