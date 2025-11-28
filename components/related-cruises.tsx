import Image from "next/image"
import Link from "next/link"
import { Star, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const relatedCruises = [
  {
    id: 2,
    name: "Red Sea Discovery",
    image: "/deck.png",
    location: "Hurghada",
    duration: "7 Days",
    rating: 4.8,
    price: 1299,
    tag: "Adventure",
  },
  {
    id: 4,
    name: "Aswan to Luxor Classic",
    image: "/cabin.png",
    location: "Aswan",
    duration: "4 Days",
    rating: 4.6,
    price: 699,
    tag: "Popular",
  },
  {
    id: 5,
    name: "Nile Dahabiya Private",
    image: "/hero.png",
    location: "Esna to Aswan",
    duration: "6 Days",
    rating: 5.0,
    price: 1899,
    tag: "Luxury",
  },
]

export function RelatedCruises() {
  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">You May Also Like</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedCruises.map((cruise) => (
          <Link key={cruise.id} href={`/cruises/${cruise.id}`} className="group">
            <article className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={cruise.image || "/hero.png"}
                  alt={cruise.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">{cruise.tag}</Badge>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <MapPin className="h-3 w-3" />
                  {cruise.location}
                </div>
                <h4 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                  {cruise.name}
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
