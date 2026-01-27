"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function RelatedCruises() {
  const [cruises, setCruises] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const response = await fetch('/api/cruises')
        const result = await response.json()
        if (result.success) {
          // Just pick 3 random ones for now
          const shuffled = [...result.data].sort(() => 0.5 - Math.random())
          setCruises(shuffled.slice(0, 3))
        }
      } catch (error) {
        console.error("Error fetching related cruises:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelated()
  }, [])

  if (loading || cruises.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">You May Also Like</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cruises.map((cruise) => (
          <Link key={cruise.id} href={`/cruises/${cruise.id}`} className="group">
            <article className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={cruise.image || "/hero.png"}
                  alt={cruise.nameEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {cruise.tags?.[0] && (
                  <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">{cruise.tags[0]}</Badge>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <MapPin className="h-3 w-3" />
                  {cruise.routeEn}
                </div>
                <h4 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                  {cruise.nameEn}
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {cruise.duration}
                    <span className="mx-1">•</span>
                    <Star className="h-3 w-3 fill-secondary text-secondary" />
                    {cruise.rating}
                  </div>
                  <div className="font-bold text-primary">${cruise.price}</div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
