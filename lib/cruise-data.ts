export interface Cruise {
  id: string
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

export function sortCruises(cruises: any[], sortBy: string): any[] {
  const sorted = [...cruises]
  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price)
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price)
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating)
    case "duration":
      // Since duration is a string like "4 Days / 3 Nights", we might need a better way to sort
      // For now, just returning as is or a simple sort
      return sorted
    default:
      return sorted
  }
}
