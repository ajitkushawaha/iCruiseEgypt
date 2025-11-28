"use client"

import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const destinations = [
  { label: "Nile River", value: "nile" },
  { label: "Red Sea", value: "redsea" },
  { label: "Luxor", value: "luxor" },
  { label: "Alexandria", value: "alexandria" },
]
const durations = ["1-3 Days", "4-7 Days", "8-14 Days", "15+ Days"]
const cruiseTypes = ["Luxury", "Premium", "Standard", "Budget", "Family"]

interface CruiseFiltersProps {
  priceRange: number[]
  setPriceRange: (range: number[]) => void
  selectedDestinations: string[]
  setSelectedDestinations: (destinations: string[]) => void
  selectedDurations: string[]
  setSelectedDurations: (durations: string[]) => void
  selectedTypes: string[]
  setSelectedTypes: (types: string[]) => void
  onClearFilters: () => void
}

export function CruiseFilters({
  priceRange,
  setPriceRange,
  selectedDestinations,
  setSelectedDestinations,
  selectedDurations,
  setSelectedDurations,
  selectedTypes,
  setSelectedTypes,
  onClearFilters,
}: CruiseFiltersProps) {
  const toggleSelection = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-muted-foreground">
          Clear All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["destination", "price", "duration", "type"]} className="w-full">
        <AccordionItem value="destination">
          <AccordionTrigger className="text-sm font-medium">Destination</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {destinations.map((dest) => (
                <div key={dest.value} className="flex items-center gap-2">
                  <Checkbox
                    id={dest.value}
                    checked={selectedDestinations.includes(dest.value)}
                    onCheckedChange={() => toggleSelection(dest.value, selectedDestinations, setSelectedDestinations)}
                  />
                  <Label htmlFor={dest.value} className="text-sm text-muted-foreground cursor-pointer">
                    {dest.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider value={priceRange} onValueChange={setPriceRange} max={3000} step={50} className="mt-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="duration">
          <AccordionTrigger className="text-sm font-medium">Duration</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {durations.map((dur) => (
                <div key={dur} className="flex items-center gap-2">
                  <Checkbox
                    id={dur}
                    checked={selectedDurations.includes(dur)}
                    onCheckedChange={() => toggleSelection(dur, selectedDurations, setSelectedDurations)}
                  />
                  <Label htmlFor={dur} className="text-sm text-muted-foreground cursor-pointer">
                    {dur}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="type">
          <AccordionTrigger className="text-sm font-medium">Cruise Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {cruiseTypes.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={type}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={() => toggleSelection(type, selectedTypes, setSelectedTypes)}
                  />
                  <Label htmlFor={type} className="text-sm text-muted-foreground cursor-pointer">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  return (
    <>
      <div className="hidden lg:block bg-card rounded-xl border border-border p-6 sticky top-24">
        <FiltersContent />
      </div>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full bg-transparent">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filter Cruises</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
