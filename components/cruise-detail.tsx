"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Star,
  MapPin,
  Clock,
  Users,
  Ship,
  Wifi,
  UtensilsCrossed,
  Waves,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Tv,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const amenityIcons: { [key: string]: any } = {
  "Swimming Pool": Waves,
  "Fine Dining": UtensilsCrossed,
  "Free Wi-Fi": Wifi,
  "Sun Deck": Ship,
  "Spa & Massage": Waves, // Fallback
  "Gourmet Restaurant": UtensilsCrossed,
  "Bar & Lounge": Coffee,
  "Cooking Classes": Coffee,
  "Telescope": Ship,
  "Sauna": Waves,
  "Gym": Users,
  "Library": Clock,
  "Butler Service": Users,
  "Private Balconies": Ship,
  "Egyptologist Guides": MapPin,
  "Fitness Center": Users,
}

export function CruiseDetail({ cruiseId }: { cruiseId: string }) {
  const [cruise, setCruise] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchCruise = async () => {
      try {
        const response = await fetch(`/api/cruises/${cruiseId}`)
        const result = await response.json()
        if (result.success && result.data) {
          setCruise(result.data)
        }
      } catch (error) {
        console.error("Error fetching cruise:", error)
      } finally {
        setLoading(false)
      }
    }

    if (cruiseId) {
      fetchCruise()
    }
  }, [cruiseId])

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="aspect-[16/9] bg-muted rounded-2xl" />
      <div className="h-8 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2" />
    </div>
  }

  if (!cruise) {
    return <div>Cruise not found</div>
  }

  const images = cruise.gallery?.length > 0 ? cruise.gallery : [cruise.image || "/hero.png"]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden mb-6">
        <div className="relative aspect-[16/9]">
          <Image
            src={images[currentImage]}
            alt={cruise.nameEn}
            fill
            className="object-cover"
          />
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_: any, index: number) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImage ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
          {cruise.tags?.[0] && (
            <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">{cruise.tags[0]}</Badge>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 mt-2">
            {images.map((img: string, index: number) => (
              <button
                key={index}
                className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentImage ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setCurrentImage(index)}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <MapPin className="h-4 w-4" />
            {cruise.routeEn}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">{cruise.nameEn}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span className="font-medium text-foreground">{cruise.rating}</span>
              <span className="text-muted-foreground">({Math.floor(Math.random() * 200) + 100} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {cruise.duration}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              2-4 guests
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-8">{cruise.descriptionEn}</p>

      {cruise.amenities?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {cruise.amenities.map((amenity: string, index: number) => {
            const Icon = amenityIcons[amenity] || Ship
            return (
              <div key={index} className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{amenity}</span>
              </div>
            )
          })}
        </div>
      )}

      {cruise.itinerary?.length > 0 && (
        <div className="mb-8">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Itinerary</h3>
          <div className="space-y-4">
            {cruise.itinerary.map((item: any, index: number) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {item.day}
                  </div>
                  {index < cruise.itinerary.length - 1 && <div className="w-0.5 h-full bg-border my-1" />}
                </div>
                <div className="pb-4">
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
