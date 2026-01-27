"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, MapPin, Check, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const recommendedPlan = {
  title: "Your Perfect Egyptian Adventure",
  summary:
    "Based on your preferences, we've curated a 5-day Nile cruise experience focusing on history, photography, and relaxation.",
  totalCost: 2450,
  savings: 350,
  cruises: [
    {
      id: 1,
      name: "Royal Nile Experience",
      image: "/hero.png",
      location: "Luxor to Aswan",
      duration: "5 Days / 4 Nights",
      rating: 4.9,
      price: 899,
      matchScore: 98,
      highlights: ["Valley of the Kings", "Karnak Temple", "Philae Temple"],
    },
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Luxor",
      activities: ["Airport transfer", "Embark cruise ship", "Welcome dinner"],
    },
    {
      day: 2,
      title: "Luxor West Bank",
      activities: ["Valley of the Kings", "Temple of Hatshepsut", "Colossi of Memnon"],
    },
    {
      day: 3,
      title: "Luxor to Edfu",
      activities: ["Karnak Temple", "Luxor Temple", "Sail to Edfu"],
    },
    {
      day: 4,
      title: "Edfu to Aswan",
      activities: ["Edfu Temple", "Kom Ombo Temple", "Arrive Aswan"],
    },
    {
      day: 5,
      title: "Aswan & Departure",
      activities: ["High Dam", "Philae Temple", "Disembarkation"],
    },
  ],
  addons: [
    { name: "Abu Simbel Day Trip", price: 180, recommended: true },
    { name: "Hot Air Balloon Ride", price: 120, recommended: true },
    { name: "Private Egyptologist Guide", price: 250, recommended: false },
  ],
}

export function TripPlannerResults() {
  const [showResults] = useState(true)

  if (!showResults) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-12 bg-muted/50 rounded-2xl">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Your Trip Plan Will Appear Here</h3>
          <p className="text-muted-foreground text-sm max-w-sm">
            Fill out the form on the left and click "Generate My Trip Plan" to see personalized recommendations
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Badge className="bg-secondary text-secondary-foreground mb-2">AI Recommended</Badge>
            <h3 className="font-serif text-2xl font-bold">{recommendedPlan.title}</h3>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-80">Total from</div>
            <div className="text-3xl font-bold">${recommendedPlan.totalCost}</div>
            <div className="text-sm text-secondary">Save ${recommendedPlan.savings}</div>
          </div>
        </div>
        <p className="text-primary-foreground/90 text-sm">{recommendedPlan.summary}</p>
      </div>

      <Tabs defaultValue="cruise" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cruise">Recommended Cruise</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="addons">Add-ons</TabsTrigger>
        </TabsList>

        <TabsContent value="cruise" className="mt-4">
          {recommendedPlan.cruises.map((cruise) => (
            <div key={cruise.id} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="relative h-48">
                <Image src={cruise.image || "/hero.png"} alt={cruise.name} fill className="object-cover" />
                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {cruise.matchScore}% Match
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  {cruise.location}
                </div>
                <h4 className="font-serif text-xl font-semibold text-foreground mb-3">{cruise.name}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {cruise.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-secondary text-secondary" />
                    {cruise.rating}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-foreground mb-2">Highlights:</div>
                  <div className="flex flex-wrap gap-2">
                    {cruise.highlights.map((highlight) => (
                      <span key={highlight} className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-2xl font-bold text-primary">
                    ${cruise.price}
                    <span className="text-sm font-normal text-muted-foreground">/person</span>
                  </div>
                  <Link href={`/cruises/${cruise.id}`}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="itinerary" className="mt-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h4 className="font-semibold text-foreground mb-4">Day-by-Day Overview</h4>
            <div className="space-y-4">
              {recommendedPlan.itinerary.map((day) => (
                <div key={day.day} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">{day.day}</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{day.title}</div>
                    <div className="text-sm text-muted-foreground">{day.activities.join(" • ")}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="addons" className="mt-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h4 className="font-semibold text-foreground mb-4">Enhance Your Experience</h4>
            <div className="space-y-3">
              {recommendedPlan.addons.map((addon) => (
                <div key={addon.name} className="flex items-center justify-between p-4 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border-2 border-primary flex items-center justify-center">
                      {addon.recommended && <Check className="h-3 w-3 text-primary" />}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{addon.name}</div>
                      {addon.recommended && <span className="text-xs text-secondary">Recommended</span>}
                    </div>
                  </div>
                  <div className="font-semibold text-foreground">+${addon.price}</div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base">
        Book This Trip Package
      </Button>
    </div>
  )
}