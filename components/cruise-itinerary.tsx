"use client"

import { useState } from "react"
import { MapPin, Clock, Utensils, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

const itinerary = [
  {
    day: 1,
    title: "Luxor - Embarkation",
    location: "Luxor",
    activities: [
      { time: "14:00", activity: "Board MS Royal Nile", type: "boarding" },
      { time: "15:00", activity: "Welcome drink & orientation", type: "meal" },
      { time: "16:00", activity: "Visit Karnak Temple", type: "tour" },
      { time: "19:00", activity: "Gala dinner onboard", type: "meal" },
    ],
  },
  {
    day: 2,
    title: "Luxor - West Bank",
    location: "Luxor",
    activities: [
      { time: "07:00", activity: "Breakfast onboard", type: "meal" },
      { time: "08:00", activity: "Valley of the Kings", type: "tour" },
      { time: "11:00", activity: "Temple of Hatshepsut", type: "tour" },
      { time: "13:00", activity: "Lunch & sail to Esna", type: "meal" },
      { time: "18:00", activity: "Esna Lock experience", type: "tour" },
    ],
  },
  {
    day: 3,
    title: "Edfu & Kom Ombo",
    location: "Edfu / Kom Ombo",
    activities: [
      { time: "07:00", activity: "Breakfast onboard", type: "meal" },
      { time: "08:00", activity: "Edfu Temple of Horus", type: "tour" },
      { time: "12:00", activity: "Lunch & sail to Kom Ombo", type: "meal" },
      { time: "16:00", activity: "Kom Ombo Temple", type: "tour" },
      { time: "19:00", activity: "Egyptian Night dinner", type: "meal" },
    ],
  },
  {
    day: 4,
    title: "Aswan Exploration",
    location: "Aswan",
    activities: [
      { time: "07:00", activity: "Breakfast onboard", type: "meal" },
      { time: "08:00", activity: "High Dam visit", type: "tour" },
      { time: "10:00", activity: "Philae Temple", type: "tour" },
      { time: "13:00", activity: "Lunch onboard", type: "meal" },
      { time: "15:00", activity: "Felucca ride around islands", type: "tour" },
      { time: "19:00", activity: "Nubian dinner show", type: "meal" },
    ],
  },
  {
    day: 5,
    title: "Aswan - Disembarkation",
    location: "Aswan",
    activities: [
      { time: "07:00", activity: "Breakfast onboard", type: "meal" },
      { time: "09:00", activity: "Disembarkation", type: "boarding" },
      { time: "10:00", activity: "Optional: Abu Simbel excursion", type: "tour" },
    ],
  },
]

export function CruiseItinerary() {
  const [selectedDay, setSelectedDay] = useState(1)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "tour":
        return Camera
      case "meal":
        return Utensils
      default:
        return Clock
    }
  }

  return (
    <div className="mb-8">
      <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">Itinerary</h3>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {itinerary.map((day) => (
          <button
            key={day.day}
            onClick={() => setSelectedDay(day.day)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              selectedDay === day.day
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            Day {day.day}
          </button>
        ))}
      </div>

      {itinerary
        .filter((day) => day.day === selectedDay)
        .map((day) => (
          <div key={day.day} className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">{day.day}</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{day.title}</h4>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {day.location}
                </div>
              </div>
            </div>

            <div className="space-y-4 ml-5 border-l-2 border-border pl-6">
              {day.activities.map((activity, index) => {
                const Icon = getActivityIcon(activity.type)
                return (
                  <div key={index} className="relative">
                    <div className="absolute -left-[29px] w-4 h-4 rounded-full bg-muted border-2 border-background" />
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                        <div className="text-sm text-foreground">{activity.activity}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
    </div>
  )
}
