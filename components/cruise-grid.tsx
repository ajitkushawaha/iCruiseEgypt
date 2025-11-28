"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Users, MapPin, Heart, Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Cruise, sortCruises } from "@/lib/cruise-data"

interface CruiseGridProps {
  cruises: Cruise[]
}

export function CruiseGrid({ cruises }: CruiseGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recommended")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]))
  }

  const sortedCruises = sortCruises(cruises, sortBy)

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <p className="text-muted-foreground">
          Showing <span className="font-medium text-foreground">{sortedCruises.length}</span> cruises
        </p>
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden sm:flex items-center gap-1 border border-border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {sortedCruises.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-xl border border-border">
          <div className="text-6xl mb-4">🚢</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No cruises found</h3>
          <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-4"
          }
        >
          {sortedCruises.map((cruise) => (
            <Link
              key={cruise.id}
              href={`/cruises/${cruise.id}`}
              className={`group ${viewMode === "list" ? "flex gap-4" : ""}`}
            >
              <article
                className={`bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border ${
                  viewMode === "list" ? "flex flex-1" : ""
                }`}
              >
                <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 md:w-64 shrink-0" : "h-56"}`}>
                  <Image
                    src={cruise.image || "/hero.png"}
                    alt={cruise.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">{cruise.tag}</Badge>
                  <button
                    onClick={(e) => toggleFavorite(cruise.id, e)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(cruise.id) ? "fill-red-500 text-red-500" : "text-foreground"
                      }`}
                    />
                  </button>
                </div>

                <div className={`p-5 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                      <MapPin className="h-4 w-4" />
                      {cruise.location}
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {cruise.name}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {cruise.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {cruise.guests}
                      </div>
                    </div>

                    {viewMode === "list" && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {cruise.amenities.slice(0, 4).map((amenity) => (
                          <span key={amenity} className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-medium text-foreground">{cruise.rating}</span>
                      <span className="text-muted-foreground text-sm">({cruise.reviews})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground line-through text-sm">${cruise.originalPrice}</span>
                      <div className="text-lg font-bold text-primary">
                        ${cruise.price}
                        <span className="text-xs font-normal text-muted-foreground">/person</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
