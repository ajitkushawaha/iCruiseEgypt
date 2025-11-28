"use client"

import { useState } from "react"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const cruiseData = {
  id: 1,
  name: "Royal Nile Experience",
  description:
    "Embark on an unforgettable journey along the legendary Nile River. This 5-day luxury cruise takes you through the heart of ancient Egypt, from the magnificent temples of Luxor to the timeless beauty of Aswan. Experience world-class service, gourmet dining, and exclusive guided tours of iconic archaeological sites.",
  images: [
    "/hero.png",
    "/cabin.png",
    "/deck.png",
    "/hero.png",
  ],
  location: "Luxor to Aswan",
  duration: "5 Days / 4 Nights",
  rating: 4.9,
  reviews: 328,
  price: 899,
  originalPrice: 1099,
  guests: "2-4",
  tag: "Best Seller",
  ship: "MS Royal Nile",
  cabins: 65,
  built: 2019,
  amenities: [
    { icon: Waves, name: "Swimming Pool" },
    { icon: UtensilsCrossed, name: "Fine Dining" },
    { icon: Wifi, name: "Free WiFi" },
    { icon: Ship, name: "Sun Deck" },
  ],
  highlights: [
    "Karnak Temple Complex",
    "Valley of the Kings",
    "Edfu Temple of Horus",
    "Kom Ombo Temple",
    "Philae Temple",
    "Aswan High Dam",
  ],
}

export function CruiseDetail({ cruiseId }: { cruiseId: string }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % cruiseData.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + cruiseData.images.length) % cruiseData.images.length)
  }

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden mb-6">
        <div className="relative aspect-[16/9]">
          <Image
            src={cruiseData.images[currentImage] || "/hero.png"}
            alt={cruiseData.name}
            fill
            className="object-cover"
          />
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
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {cruiseData.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImage ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
          <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">{cruiseData.tag}</Badge>
        </div>

        <div className="flex gap-2 mt-2">
          {cruiseData.images.map((img, index) => (
            <button
              key={index}
              className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentImage ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <Image src={img || "/hero.png"} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <MapPin className="h-4 w-4" />
            {cruiseData.location}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">{cruiseData.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span className="font-medium text-foreground">{cruiseData.rating}</span>
              <span className="text-muted-foreground">({cruiseData.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {cruiseData.duration}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              {cruiseData.guests} guests
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

      <p className="text-muted-foreground leading-relaxed mb-8">{cruiseData.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cruiseData.amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-3 p-4 bg-muted rounded-xl">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <amenity.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">{amenity.name}</span>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-6 mb-8">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Ship Details</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Ship Name</div>
            <div className="font-medium text-foreground">{cruiseData.ship}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Cabins</div>
            <div className="font-medium text-foreground">{cruiseData.cabins}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Year Built</div>
            <div className="font-medium text-foreground">{cruiseData.built}</div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Trip Highlights</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {cruiseData.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-sm text-foreground">{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
