"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Users, MapPin, Sparkles, Heart, Mountain, Camera, Utensils, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const interests = [
  { id: "history", label: "History & Temples", icon: Camera },
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "relaxation", label: "Relaxation", icon: Waves },
  { id: "culinary", label: "Culinary", icon: Utensils },
  { id: "romance", label: "Romance", icon: Heart },
  { id: "photography", label: "Photography", icon: Camera },
]

export function TripPlannerForm() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [budget, setBudget] = useState([1500])
  const [isGenerating, setIsGenerating] = useState(false)

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 3000)
  }

  return (
    <div>
      <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Tell Us About Your Dream Trip</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="destination" className="text-sm font-medium">
                Preferred Region
              </Label>
              <div className="relative mt-1.5">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Select>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nile">Nile River</SelectItem>
                    <SelectItem value="redsea">Red Sea</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                    <SelectItem value="any">No preference</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="duration" className="text-sm font-medium">
                Trip Duration
              </Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Select>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">2-3 Days</SelectItem>
                    <SelectItem value="5">4-5 Days</SelectItem>
                    <SelectItem value="7">6-7 Days</SelectItem>
                    <SelectItem value="10">8-10 Days</SelectItem>
                    <SelectItem value="14">10+ Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="travelers" className="text-sm font-medium">
                Number of Travelers
              </Label>
              <div className="relative mt-1.5">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Select>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select travelers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Solo Traveler</SelectItem>
                    <SelectItem value="2">Couple</SelectItem>
                    <SelectItem value="4">Family (3-4)</SelectItem>
                    <SelectItem value="6">Group (5-6)</SelectItem>
                    <SelectItem value="10">Large Group (7+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="dates" className="text-sm font-medium">
                Preferred Travel Dates
              </Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="dates" type="date" className="pl-10" />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Budget Per Person</Label>
            <div className="mt-4 px-2">
              <Slider value={budget} onValueChange={setBudget} max={5000} min={300} step={100} />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>$300</span>
                <span className="font-medium text-foreground">${budget[0]}</span>
                <span>$5000+</span>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Your Interests (select all that apply)</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest.id}
                  type="button"
                  onClick={() => toggleInterest(interest.id)}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left",
                    selectedInterests.includes(interest.id)
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  <interest.icon className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-medium">{interest.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="special" className="text-sm font-medium">
              Special Requests or Preferences
            </Label>
            <Textarea
              id="special"
              placeholder="Tell us about any special requirements, dietary restrictions, accessibility needs, or specific experiences you'd like..."
              className="mt-1.5 min-h-[100px]"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Generating Your Perfect Trip...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate My Trip Plan
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}