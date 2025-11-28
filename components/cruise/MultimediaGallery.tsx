"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { getLocalizedText } from "@/lib/i18n/utils"
import { cn } from "@/lib/utils"

interface GalleryItem {
  url: string
  type: 'image' | 'video'
  caption?: string
  captionEn?: string
  captionAr?: string
}

interface MultimediaGalleryProps {
  gallery: GalleryItem[]
  cruiseName: string
}

export function MultimediaGallery({ gallery, cruiseName }: MultimediaGalleryProps) {
  const { t, locale, isRTL } = useLanguage()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!gallery || gallery.length === 0) {
    return null
  }

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedIndex(null)
  }

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length)
  }

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  const selectedItem = gallery[currentIndex]
  const caption = getLocalizedText(
    selectedItem.captionEn,
    selectedItem.captionAr,
    locale,
    selectedItem.caption
  )

  return (
    <>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${isRTL ? 'grid-flow-col-dense' : ''}`}>
        {gallery.slice(0, 8).map((item, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative aspect-square rounded-lg overflow-hidden group hover:scale-105 transition-transform"
          >
            {item.type === 'image' ? (
              <Image
                src={item.url}
                alt={caption || `Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="relative w-full h-full bg-muted flex items-center justify-center">
                <Play className="h-12 w-12 text-primary" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
        {gallery.length > 8 && (
          <button
            onClick={() => openLightbox(8)}
            className="relative aspect-square rounded-lg overflow-hidden bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
          >
            <span className="text-lg font-medium">+{gallery.length - 8} {t.common.more}</span>
          </button>
        )}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-7xl w-full p-0 bg-black/95 border-none">
          <div className="relative aspect-video">
            {selectedItem?.type === 'image' ? (
              <Image
                src={selectedItem.url}
                alt={caption || cruiseName}
                fill
                className="object-contain"
              />
            ) : (
              <video
                src={selectedItem.url}
                controls
                autoPlay
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            )}

            {caption && (
              <div className={`absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 ${isRTL ? 'text-right' : ''}`}>
                <p>{caption}</p>
              </div>
            )}

            {gallery.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} bg-white/20 hover:bg-white/40 text-white`}
                  onClick={isRTL ? nextItem : prevItem}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'} bg-white/20 hover:bg-white/40 text-white`}
                  onClick={isRTL ? prevItem : nextItem}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-white/20 hover:bg-white/40 text-white`}
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
