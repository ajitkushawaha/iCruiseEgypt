"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, Wifi, Car, Utensils, Search, Filter, SlidersHorizontal, Building2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { getLocalizedText } from "@/lib/i18n/utils"
import { cn } from "@/lib/utils"

interface Hotel {
  _id: string
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
  city: string
  starRating: number
}

export default function HotelsPage() {
  const { t, locale, isRTL } = useLanguage()
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [selectedStarRating, setSelectedStarRating] = useState<string>("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchHotels()
  }, [selectedCity, selectedStarRating])

  const fetchHotels = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({ available: 'true' })
      if (selectedCity) queryParams.append('city', selectedCity)
      if (selectedStarRating) queryParams.append('starRating', selectedStarRating)
      
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

  const filteredHotels = hotels.filter(hotel => {
    const name = getLocalizedText(hotel.nameEn, hotel.nameAr, locale).toLowerCase()
    const location = getLocalizedText(hotel.locationEn, hotel.locationAr, locale).toLowerCase()
    const query = searchQuery.toLowerCase()
    
    const matchesSearch = !query || name.includes(query) || location.includes(query)
    const matchesPrice = hotel.pricePerNight >= priceRange[0] && hotel.pricePerNight <= priceRange[1]
    
    return matchesSearch && matchesPrice
  })

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(price)
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

  const cities = Array.from(new Set(hotels.map(h => h.city))).filter(Boolean)

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 md:pt-24">
        {/* Hero Section */}
        <div className="relative py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.nav.hotels || 'Hotels'}
              </h1>
              <p className="text-lg text-muted-foreground">
                Find the perfect hotel for your Egyptian adventure
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className={`flex flex-col md:flex-row gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 relative">
                  <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                  <Input
                    placeholder={t.common.search || "Search hotels..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={isRTL ? 'pr-10' : 'pl-10'}
                  />
                </div>
                
                <Select value={selectedCity || "all"} onValueChange={(value) => setSelectedCity(value === "all" ? "" : value)}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder={t.common.allCities || "All Cities"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.common.allCities || "All Cities"}</SelectItem>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStarRating || "all"} onValueChange={(value) => setSelectedStarRating(value === "all" ? "" : value)}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder={t.common.allRatings || "All Ratings"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.common.allRatings || "All Ratings"}</SelectItem>
                    {[5, 4, 3, 2, 1].map(rating => (
                      <SelectItem key={rating} value={rating.toString()}>{rating}★</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="shrink-0"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  {t.common.filters || "Filters"}
                </Button>
              </div>

              {showFilters && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t.common.priceRange || "Price Range"}: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-24"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500])}
                        className="w-24"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{t.common.loading || "Loading hotels..."}</p>
            </div>
          ) : filteredHotels.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{t.common.noResults || "No hotels found"}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <Card key={hotel._id} className="group hover:shadow-lg transition-shadow">
                  <Link href={`/hotels/${hotel._id}`}>
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      {hotel.images?.[0] ? (
                        <Image
                          src={hotel.images[0]}
                          alt={getName(hotel)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Building2 className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                        {hotel.starRating}★
                      </Badge>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{getName(hotel)}</h3>
                      
                      <div className={`flex items-center gap-2 text-sm text-muted-foreground mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{getLocation(hotel)}</span>
                      </div>

                      <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{hotel.rating.toFixed(1)}</span>
                        </div>
                        {hotel.amenities?.slice(0, 3).map((amenity, idx) => {
                          const Icon = amenity.toLowerCase().includes('wifi') ? Wifi :
                                      amenity.toLowerCase().includes('parking') ? Car :
                                      amenity.toLowerCase().includes('restaurant') ? Utensils : null
                          return Icon ? (
                            <Icon key={idx} className="h-4 w-4 text-muted-foreground" />
                          ) : null
                        })}
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {getDescription(hotel)}
                      </p>

                      <div className={`flex items-center justify-between pt-4 border-t border-border ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div>
                          <div className="text-2xl font-bold text-primary">
                            {formatPrice(hotel.pricePerNight, hotel.currency)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {t.common.perNight || "per night"}
                          </div>
                        </div>
                        <Button size="sm">
                          {t.common.viewDetails || "View Details"}
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredHotels.length > 0 && (
            <div className="text-center mt-8 text-muted-foreground">
              Showing {filteredHotels.length} of {hotels.length} hotels
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}

