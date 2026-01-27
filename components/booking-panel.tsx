"use client"

import { useState, useEffect } from "react"
import { Calendar, Users, Shield, Clock, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function BookingPanel({ cruiseId }: { cruiseId: string }) {
  const [cruise, setCruise] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [guests, setGuests] = useState("2")
  const [date, setDate] = useState("")
  const [isBooking, setIsBooking] = useState(false)

  useEffect(() => {
    const fetchCruise = async () => {
      try {
        const response = await fetch(`/api/cruises/${cruiseId}`)
        const result = await response.json()
        if (result.success && result.data) {
          setCruise(result.data)
        }
      } catch (error) {
        console.error("Error fetching cruise for booking:", error)
      } finally {
        setLoading(false)
      }
    }

    if (cruiseId) {
      fetchCruise()
    }
  }, [cruiseId])

  if (loading) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 shadow-lg animate-pulse">
        <div className="h-8 bg-muted rounded w-1/2 mb-4" />
        <div className="space-y-4">
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
        </div>
      </div>
    )
  }

  const basePrice = cruise?.price || 0
  const guestCount = Number.parseInt(guests)
  const subtotal = basePrice * guestCount
  const taxes = Math.round(subtotal * 0.14)
  const total = subtotal + taxes
  const originalPrice = Math.round(basePrice * 1.2)

  return (
    <div className="sticky top-24">
      <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <span className="text-muted-foreground line-through text-sm">${originalPrice}</span>
            <div className="text-3xl font-bold text-primary">
              ${basePrice}
              <span className="text-base font-normal text-muted-foreground">/person</span>
            </div>
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">18% OFF</div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="date" className="text-sm font-medium">
              Select Date
            </Label>
            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="pl-10" />
            </div>
          </div>

          <div>
            <Label htmlFor="guests" className="text-sm font-medium">
              Number of Guests
            </Label>
            <div className="relative mt-1">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="pl-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">${basePrice} x {guestCount} guests</span>
            <span className="text-foreground">${subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Taxes & Fees</span>
            <span className="text-foreground">${taxes}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
            <span>Total</span>
            <span className="text-primary">${total}</span>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground">
              Book Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">Complete Your Booking</DialogTitle>
              <DialogDescription>Enter your details to secure your cruise reservation.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="+1 234 567 890" className="mt-1" />
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{cruise?.nameEn}</span>
                  <span className="text-sm font-medium">${total}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {guestCount} guests • {date || "Select a date"}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={(e) => {
                  e.preventDefault()
                  setIsBooking(true)
                  setTimeout(() => setIsBooking(false), 2000)
                }}
                disabled={isBooking}
              >
                {isBooking ? "Processing..." : "Confirm & Pay"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Free cancellation up to 48 hours before departure
        </p>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            <span>Secure payment processing</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>Instant confirmation</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <CreditCard className="h-4 w-4 text-primary" />
            <span>Pay in 3 installments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
