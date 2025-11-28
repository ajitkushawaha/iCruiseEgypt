"use client"

import { useState } from "react"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { cn } from "@/lib/utils"

interface CabinVideoGalleryProps {
  cabinVideos: string[]
  cruiseName: string
}

export function CabinVideoGallery({ cabinVideos, cruiseName }: CabinVideoGalleryProps) {
  const { t, isRTL } = useLanguage()
  const [selectedVideo, setSelectedVideo] = useState(0)
  const [playing, setPlaying] = useState(false)

  if (!cabinVideos || cabinVideos.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={isRTL ? 'text-right' : ''}>{t.cruise.cabinVideos}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cabinVideos.length > 1 && (
          <div className={`flex gap-2 overflow-x-auto pb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {cabinVideos.map((video, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedVideo(index)
                  setPlaying(false)
                }}
                className={cn(
                  "relative w-32 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-muted flex items-center justify-center",
                  selectedVideo === index
                    ? "border-primary"
                    : "border-border hover:border-primary/50"
                )}
              >
                <Play className="h-8 w-8 text-primary" />
              </button>
            ))}
          </div>
        )}

        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
          <video
            key={cabinVideos[selectedVideo]}
            src={cabinVideos[selectedVideo]}
            controls
            className="w-full h-full"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </CardContent>
    </Card>
  )
}
