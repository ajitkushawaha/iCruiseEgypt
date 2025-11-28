"use client"

import { useState } from "react"
import Image from "next/image"
import { ZoomIn, ZoomOut, RotateCw, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { cn } from "@/lib/utils"

interface DeckPlanViewerProps {
  deckPlans: string[]
  cruiseName: string
}

export function DeckPlanViewer({ deckPlans, cruiseName }: DeckPlanViewerProps) {
  const { t, isRTL } = useLanguage()
  const [selectedPlan, setSelectedPlan] = useState(0)
  const [zoom, setZoom] = useState(100)

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50))
  }

  const handleReset = () => {
    setZoom(100)
  }

  if (!deckPlans || deckPlans.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={isRTL ? 'text-right' : ''}>{t.cruise.deckPlan}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {deckPlans.length > 1 && (
          <div className={`flex gap-2 overflow-x-auto pb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {deckPlans.map((plan, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedPlan(index)
                  setZoom(100)
                }}
                className={cn(
                  "relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0",
                  selectedPlan === index
                    ? "border-primary"
                    : "border-border hover:border-primary/50"
                )}
              >
                <Image
                  src={plan}
                  alt={`Deck Plan ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="relative border rounded-lg overflow-hidden bg-muted">
          <div className="flex justify-between items-center p-2 bg-background border-b">
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom <= 50}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoom >= 200}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">{zoom}%</span>
          </div>
          <div className="overflow-auto max-h-[600px]">
            <div
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top left",
                width: `${100 / (zoom / 100)}%`,
              }}
              className="relative"
            >
              <Image
                src={deckPlans[selectedPlan]}
                alt={`${cruiseName} Deck Plan`}
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
