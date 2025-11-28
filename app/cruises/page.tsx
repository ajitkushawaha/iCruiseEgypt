"use client"

import { useState, useEffect, useMemo, Suspense, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CruiseFilters } from "@/components/cruise-filters"
import { CruiseGrid } from "@/components/cruise-grid"
import { CruiseListingSkeleton } from "@/components/cruise-listing-skeleton"
import { allCruises, filterCruises } from "@/lib/cruise-data"

function CruisesContent() {
  const searchParams = useSearchParams()

  const initializedRef = useRef(false)

  const initialDestination = searchParams.get("destination") || ""
  const initialGuests = searchParams.get("guests") ? Number.parseInt(searchParams.get("guests")!) : undefined

  const [priceRange, setPriceRange] = useState([0, 3000])
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    initialDestination && initialDestination !== "all" ? [initialDestination] : [],
  )
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [guests, setGuests] = useState<number | undefined>(initialGuests)

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    const dest = searchParams.get("destination")
    const guestsParam = searchParams.get("guests")

    if (dest && dest !== "all") {
      setSelectedDestinations([dest])
    }
    if (guestsParam) {
      setGuests(Number.parseInt(guestsParam))
    }
  }, [searchParams])

  const filteredCruises = useMemo(() => {
    return filterCruises(allCruises, {
      destination: selectedDestinations.length === 1 ? selectedDestinations[0] : undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      duration: selectedDurations.length > 0 ? selectedDurations : undefined,
      type: selectedTypes.length > 0 ? selectedTypes : undefined,
      guests: guests,
    })
  }, [priceRange, selectedDestinations, selectedDurations, selectedTypes, guests])

  const clearFilters = () => {
    setPriceRange([0, 3000])
    setSelectedDestinations([])
    setSelectedDurations([])
    setSelectedTypes([])
    setGuests(undefined)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-72 shrink-0">
          <CruiseFilters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedDestinations={selectedDestinations}
            setSelectedDestinations={setSelectedDestinations}
            selectedDurations={selectedDurations}
            setSelectedDurations={setSelectedDurations}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            onClearFilters={clearFilters}
          />
        </aside>
        <div className="flex-1">
          <CruiseGrid cruises={filteredCruises} />
        </div>
      </div>
    </div>
  )
}

export default function CruisesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 md:pt-24">
        <div className="bg-primary py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              Explore Our Cruises
            </h1>
            <p className="text-primary-foreground/80">
              Discover unforgettable journeys across Egypt's most beautiful waters
            </p>
          </div>
        </div>

        <Suspense fallback={<CruiseListingSkeleton />}>
          <CruisesContent />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
