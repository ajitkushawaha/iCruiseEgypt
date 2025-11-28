export interface Cruise {
  id: number
  name: string
  image: string
  location: string
  region: string
  duration: string
  durationDays: number
  rating: number
  reviews: number
  price: number
  originalPrice: number
  guests: string
  maxGuests: number
  tag: string
  type: string
  amenities: string[]
  departureDate: string
}

export const allCruises: Cruise[] = [
  {
    id: 1,
    name: "Royal Nile Experience",
    image: "/hero.png",
    location: "Luxor to Aswan",
    region: "nile",
    duration: "5 Days / 4 Nights",
    durationDays: 5,
    rating: 4.9,
    reviews: 328,
    price: 899,
    originalPrice: 1099,
    guests: "2-4",
    maxGuests: 4,
    tag: "Best Seller",
    type: "Luxury",
    amenities: ["Pool", "Spa", "Restaurant", "WiFi"],
    departureDate: "2025-01-15",
  },
  {
    id: 2,
    name: "Red Sea Discovery",
    image: "/deck.png",
    location: "Hurghada to Sharm El Sheikh",
    region: "redsea",
    duration: "7 Days / 6 Nights",
    durationDays: 7,
    rating: 4.8,
    reviews: 256,
    price: 1299,
    originalPrice: 1499,
    guests: "2-6",
    maxGuests: 6,
    tag: "New",
    type: "Premium",
    amenities: ["Pool", "Diving", "Restaurant", "Bar"],
    departureDate: "2025-01-20",
  },
  {
    id: 3,
    name: "Cairo Explorer Cruise",
    image: "/cabin.png",
    location: "Cairo",
    region: "nile",
    duration: "3 Days / 2 Nights",
    durationDays: 3,
    rating: 4.7,
    reviews: 189,
    price: 499,
    originalPrice: 599,
    guests: "2-8",
    maxGuests: 8,
    tag: "Popular",
    type: "Standard",
    amenities: ["Restaurant", "WiFi", "Bar"],
    departureDate: "2025-01-10",
  },
  {
    id: 4,
    name: "Aswan to Luxor Classic",
    image: "/deck.png",
    location: "Aswan to Luxor",
    region: "luxor",
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    rating: 4.6,
    reviews: 412,
    price: 699,
    originalPrice: 849,
    guests: "2-4",
    maxGuests: 4,
    tag: "Value",
    type: "Standard",
    amenities: ["Pool", "Restaurant", "WiFi"],
    departureDate: "2025-02-01",
  },
  {
    id: 5,
    name: "Nile Dahabiya Private Cruise",
    image: "/hero.png",
    location: "Esna to Aswan",
    region: "nile",
    duration: "6 Days / 5 Nights",
    durationDays: 6,
    rating: 5.0,
    reviews: 89,
    price: 1899,
    originalPrice: 2199,
    guests: "2-8",
    maxGuests: 8,
    tag: "Exclusive",
    type: "Luxury",
    amenities: ["Private Deck", "Chef", "Spa", "WiFi"],
    departureDate: "2025-02-15",
  },
  {
    id: 6,
    name: "Alexandria Mediterranean",
    image: "/deck.png",
    location: "Alexandria",
    region: "alexandria",
    duration: "2 Days / 1 Night",
    durationDays: 2,
    rating: 4.5,
    reviews: 156,
    price: 349,
    originalPrice: 449,
    guests: "2-6",
    maxGuests: 6,
    tag: "Quick Escape",
    type: "Budget",
    amenities: ["Restaurant", "Bar"],
    departureDate: "2025-01-25",
  },
  {
    id: 7,
    name: "Red Sea Diving Adventure",
    image: "/cabin.png",
    location: "Marsa Alam",
    region: "redsea",
    duration: "5 Days / 4 Nights",
    durationDays: 5,
    rating: 4.9,
    reviews: 234,
    price: 1099,
    originalPrice: 1299,
    guests: "4-12",
    maxGuests: 12,
    tag: "Adventure",
    type: "Premium",
    amenities: ["Diving Equipment", "Instructor", "Restaurant"],
    departureDate: "2025-03-01",
  },
  {
    id: 8,
    name: "Family Nile Adventure",
    image: "/hero.png",
    location: "Luxor Round Trip",
    region: "luxor",
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    rating: 4.7,
    reviews: 298,
    price: 599,
    originalPrice: 749,
    guests: "4-8",
    maxGuests: 8,
    tag: "Family",
    type: "Family",
    amenities: ["Kids Club", "Pool", "Restaurant", "WiFi"],
    departureDate: "2025-02-20",
  },
]

export function filterCruises(
  cruises: Cruise[],
  filters: {
    destination?: string
    minPrice?: number
    maxPrice?: number
    duration?: string[]
    type?: string[]
    guests?: number
    searchDate?: string
  },
): Cruise[] {
  return cruises.filter((cruise) => {
    // Filter by destination/region
    if (filters.destination && filters.destination !== "all") {
      if (cruise.region !== filters.destination) return false
    }

    // Filter by price range
    if (filters.minPrice !== undefined && cruise.price < filters.minPrice) return false
    if (filters.maxPrice !== undefined && cruise.price > filters.maxPrice) return false

    // Filter by duration
    if (filters.duration && filters.duration.length > 0) {
      const matchesDuration = filters.duration.some((dur) => {
        if (dur === "1-3 Days") return cruise.durationDays <= 3
        if (dur === "4-7 Days") return cruise.durationDays >= 4 && cruise.durationDays <= 7
        if (dur === "8-14 Days") return cruise.durationDays >= 8 && cruise.durationDays <= 14
        if (dur === "15+ Days") return cruise.durationDays >= 15
        return false
      })
      if (!matchesDuration) return false
    }

    // Filter by cruise type
    if (filters.type && filters.type.length > 0) {
      if (!filters.type.includes(cruise.type)) return false
    }

    // Filter by guests
    if (filters.guests && cruise.maxGuests < filters.guests) return false

    return true
  })
}

export function sortCruises(cruises: Cruise[], sortBy: string): Cruise[] {
  const sorted = [...cruises]
  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price)
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price)
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating)
    case "duration":
      return sorted.sort((a, b) => a.durationDays - b.durationDays)
    default:
      return sorted
  }
}
