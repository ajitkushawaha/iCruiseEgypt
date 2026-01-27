"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Users, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function FeaturedCruises() {
  const [cruises, setCruises] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch("/api/cruises")
        const result = await response.json()
        if (result.success) {
          // Take top 3 or first 3 as featured
          setCruises(result.data.slice(0, 3))
        }
      } catch (error) {
        console.error("Error fetching featured cruises:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-muted rounded w-1/4 mb-12 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/5] bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-secondary font-medium text-sm tracking-wider uppercase">Featured Cruises</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">Most Popular Journeys</h2>
          </div>
          <Link href="/cruises">
            <Button variant="outline" className="group bg-transparent">
              View All Cruises
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cruises.map((cruise) => (
            <Link key={cruise.id} href={`/cruises/${cruise.id}`} className="group">
              <article className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={cruise.image || "/hero.png"}
                    alt={cruise.nameEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {cruise.tags?.[0] && (
                    <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">{cruise.tags[0]}</Badge>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    {cruise.routeEn}
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {cruise.nameEn}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {cruise.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      2-4 guests
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-medium text-foreground">{cruise.rating}</span>
                      <span className="text-muted-foreground text-sm">({Math.floor(Math.random() * 200) + 100})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground line-through text-sm">${Math.round(cruise.price * 1.2)}</span>
                      <div className="text-xl font-bold text-primary">
                        ${cruise.price}
                        <span className="text-sm font-normal text-muted-foreground">/person</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
