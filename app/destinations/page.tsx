import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Ship, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Destinations - iCruiseEgypt",
  description:
    "Explore Egypt's most beautiful cruise destinations - Nile River, Red Sea, Luxor, Aswan, and Alexandria.",
}

const destinations = [
  {
    id: "nile",
    name: "Nile River",
    description:
      "Journey through the heart of ancient Egypt along the world's longest river. Discover temples, tombs, and timeless beauty.",
    image: "/hero.png",
    cruises: 68,
    rating: 4.9,
    highlights: ["Luxor Temple", "Valley of the Kings", "Karnak", "Edfu Temple"],
    duration: "3-7 Days",
  },
  {
    id: "redsea",
    name: "Red Sea",
    description: "Crystal-clear waters, vibrant coral reefs, and world-class diving await in Egypt's Red Sea paradise.",
    image: "/deck.png",
    cruises: 42,
    rating: 4.8,
    highlights: ["Coral Reefs", "Diving Sites", "Marine Life", "Pristine Beaches"],
    duration: "4-10 Days",
  },
  {
    id: "luxor",
    name: "Luxor",
    description: "The world's greatest open-air museum. Explore ancient Thebes, the city of pharaohs and gods.",
    image: "/hero.png",
    cruises: 45,
    rating: 4.9,
    highlights: ["Karnak Temple", "Luxor Temple", "Valley of Queens", "Colossi of Memnon"],
    duration: "2-5 Days",
  },
  {
    id: "aswan",
    name: "Aswan",
    description:
      "Where the Nile is at its most beautiful. Experience Nubian culture, ancient temples, and serene landscapes.",
    image: "/cabin.png",
    cruises: 38,
    rating: 4.8,
    highlights: ["Philae Temple", "High Dam", "Abu Simbel", "Nubian Villages"],
    duration: "2-4 Days",
  },
  {
    id: "alexandria",
    name: "Alexandria",
    description: "The pearl of the Mediterranean. Discover Greco-Roman heritage and Egypt's cosmopolitan coastal city.",
    image: "/deck.png",
    cruises: 18,
    rating: 4.7,
    highlights: ["Library of Alexandria", "Citadel of Qaitbay", "Corniche", "Roman Amphitheater"],
    duration: "1-3 Days",
  },
  {
    id: "cairo",
    name: "Cairo",
    description: "The city that never sleeps. Combine Nile cruises with visits to the Pyramids and Egyptian Museum.",
    image: "/hero.png",
    cruises: 32,
    rating: 4.8,
    highlights: ["Pyramids of Giza", "Egyptian Museum", "Khan el-Khalili", "Sphinx"],
    duration: "2-4 Days",
  },
]

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 md:pt-24">
        <div className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              Explore Egypt
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 text-balance">
              Discover Amazing Destinations
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              From the ancient temples of the Nile to the crystal waters of the Red Sea, find your perfect Egyptian
              adventure
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-8">
            {destinations.map((destination, index) => (
              <div
                key={destination.id}
                className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 items-center`}
              >
                <div className="lg:w-1/2">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={destination.image || "/hero.png"}
                      alt={destination.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                        {destination.cruises} Cruises
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-secondary" />
                    <span className="text-secondary font-medium text-sm">Egypt</span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{destination.name}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{destination.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {destination.highlights.map((highlight) => (
                      <span key={highlight} className="px-3 py-1.5 bg-muted rounded-full text-sm text-foreground">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-secondary text-secondary" />
                      <span className="font-medium">{destination.rating}</span>
                      <span className="text-muted-foreground text-sm">rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ship className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground text-sm">{destination.duration}</span>
                    </div>
                  </div>

                  <Link href={`/cruises?destination=${destination.id}`}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Explore Cruises
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
