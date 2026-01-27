"use client"

import { useState, useEffect, useMemo, Suspense, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CruiseFilters } from "@/components/cruise-filters"
import { CruiseGrid } from "@/components/cruise-grid"
import { CruiseListingSkeleton } from "@/components/cruise-listing-skeleton"

function CruisesContent() {
  const searchParams = useSearchParams()

  const initializedRef = useRef(false)

  const initialDestination = searchParams.get("destination") || ""
  const initialGuests = searchParams.get("guests") ? Number.parseInt(searchParams.get("guests")!) : undefined

  const [cruises, setCruises] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    initialDestination && initialDestination !== "all" ? [initialDestination] : [],
  )
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [guests, setGuests] = useState<number | undefined>(initialGuests)

  useEffect(() => {
    const fetchCruises = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (selectedDestinations.length > 0) params.append('destination', selectedDestinations[0])
        params.append('minPrice', priceRange[0].toString())
        params.append('maxPrice', priceRange[1].toString())
        
        const response = await fetch(`/api/cruises?${params.toString()}`)
        const result = await response.json()
        if (result.success) {
          setCruises(result.data)
        }
      } catch (error) {
        console.error('Error fetching cruises:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCruises()
  }, [priceRange, selectedDestinations])

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

  const clearFilters = () => {
    setPriceRange([0, 3000])
    setSelectedDestinations([])
    setSelectedDurations([])
    setSelectedTypes([])
    setGuests(undefined)
  }

  if (loading) return <CruiseListingSkeleton />

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
          <CruiseGrid cruises={cruises} />
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
