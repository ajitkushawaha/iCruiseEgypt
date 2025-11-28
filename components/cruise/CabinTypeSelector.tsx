"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Users, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { getLocalizedText } from "@/lib/i18n/utils"
import { cn } from "@/lib/utils"

interface CabinType {
  name: string
  nameEn?: string
  nameAr?: string
  description: string
  descriptionEn?: string
  descriptionAr?: string
  images: string[]
  video?: string
  price: number
  capacity: number
}

interface CabinTypeSelectorProps {
  cabinTypes: CabinType[]
  selectedCabin?: string
  onSelect: (cabinType: CabinType) => void
}

export function CabinTypeSelector({
  cabinTypes,
  selectedCabin,
  onSelect,
}: CabinTypeSelectorProps) {
  const { t, locale, isRTL } = useLanguage()
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!cabinTypes || cabinTypes.length === 0) {
    return null
  }

  const selectedType = cabinTypes[selectedIndex]
  const name = getLocalizedText(
    selectedType.nameEn,
    selectedType.nameAr,
    locale,
    selectedType.name
  )
  const description = getLocalizedText(
    selectedType.descriptionEn,
    selectedType.descriptionAr,
    locale,
    selectedType.description
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <div className={`flex gap-2 overflow-x-auto pb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {cabinTypes.map((cabin, index) => {
          const cabinName = getLocalizedText(
            cabin.nameEn,
            cabin.nameAr,
            locale,
            cabin.name
          )
          return (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative w-32 h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0",
                selectedIndex === index
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              )}
            >
              {cabin.images[0] && (
                <Image
                  src={cabin.images[0]}
                  alt={cabinName}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-1 left-1 right-1">
                <p className="text-xs text-white font-medium truncate">{cabinName}</p>
              </div>
            </button>
          )
        })}
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className={`grid md:grid-cols-2 gap-6 ${isRTL ? 'md:grid-flow-col-dense' : ''}`}>
            <div className="space-y-4">
              <div>
                <h3 className={`text-xl font-semibold mb-2 ${isRTL ? 'text-right' : ''}`}>
                  {name}
                </h3>
                <p className={`text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                  {description}
                </p>
              </div>

              <div className={`flex flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm">{selectedType.capacity} {t.common.guests}</span>
                </div>
                <Badge variant="secondary" className="text-lg font-semibold">
                  {formatPrice(selectedType.price)} / {t.booking.perPerson}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              {selectedType.video ? (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <video
                    src={selectedType.video}
                    controls
                    className="w-full h-full"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : selectedType.images[0] ? (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={selectedType.images[0]}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : null}

              {selectedType.images.length > 1 && (
                <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {selectedType.images.slice(1, 4).map((image, index) => (
                    <div
                      key={index}
                      className="relative w-20 h-20 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`${name} ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={() => onSelect(selectedType)}
            className="w-full"
            variant={selectedCabin === name ? "default" : "outline"}
          >
            {selectedCabin === name && <Check className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />}
            {selectedCabin === name ? "Selected" : t.booking.selectGuests}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
