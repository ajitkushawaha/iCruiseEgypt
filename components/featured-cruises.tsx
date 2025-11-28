import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Users, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const cruises = [
  {
    id: 1,
    name: "Royal Nile Experience",
    image: "/hero.png",
    location: "Luxor to Aswan",
    duration: "5 Days / 4 Nights",
    rating: 4.9,
    reviews: 328,
    price: 899,
    originalPrice: 1099,
    guests: "2-4",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Red Sea Discovery",
    image: "/deck.png",
    location: "Hurghada to Sharm El Sheikh",
    duration: "7 Days / 6 Nights",
    rating: 4.8,
    reviews: 256,
    price: 1299,
    originalPrice: 1499,
    guests: "2-6",
    tag: "New",
  },
  {
    id: 3,
    name: "Cairo Explorer Cruise",
    image: "/cabin.png",
    location: "Cairo",
    duration: "3 Days / 2 Nights",
    rating: 4.7,
    reviews: 189,
    price: 499,
    originalPrice: 599,
    guests: "2-8",
    tag: "Popular",
  },
]

export function FeaturedCruises() {
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
                    alt={cruise.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">{cruise.tag}</Badge>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    {cruise.location}
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {cruise.name}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {cruise.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {cruise.guests}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-medium text-foreground">{cruise.rating}</span>
                      <span className="text-muted-foreground text-sm">({cruise.reviews})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground line-through text-sm">${cruise.originalPrice}</span>
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
