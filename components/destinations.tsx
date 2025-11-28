import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const destinations = [
  {
    name: "Luxor",
    cruises: 42,
    image: "/hero.png",
  },
  {
    name: "Aswan",
    cruises: 38,
    image: "/deck.png",
  },
  {
    name: "Red Sea",
    cruises: 25,
    image: "/cabin.png",
  },
  {
    name: "Alexandria",
    cruises: 18,
    image: "/hero.png",
  },
]

export function Destinations() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-secondary font-medium text-sm tracking-wider uppercase">Explore Egypt</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">Popular Destinations</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {destinations.map((destination, index) => (
            <Link
              key={index}
              href={`/cruises?destination=${destination.name.toLowerCase()}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image
                src={destination.image || "/hero.png"}
                alt={destination.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-white">{destination.name}</h3>
                    <p className="text-white/80 text-sm">{destination.cruises} Cruises</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-secondary transition-colors">
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
