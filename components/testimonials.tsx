import Image from "next/image"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "London, UK",
    avatar: "/hero.png",
    rating: 5,
    text: "An absolutely magical experience! The Nile cruise exceeded all expectations. The temples, the service, everything was perfect.",
  },
  {
    name: "Ahmed Hassan",
    location: "Dubai, UAE",
    avatar: "/deck.png",
    rating: 5,
    text: "Finally, a platform that makes booking Egyptian cruises easy. The trip planner feature helped us create the perfect itinerary.",
  },
  {
    name: "Maria Garcia",
    location: "Madrid, Spain",
    avatar: "/cabin.png",
    rating: 5,
    text: "The Red Sea cruise was breathtaking. Crystal clear waters, amazing diving spots. Will definitely book again through iCruiseEgypt!",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-secondary font-medium text-sm tracking-wider uppercase">Testimonials</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2">What Our Travelers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 relative">
              <Quote className="absolute top-6 right-6 h-10 w-10 text-secondary/30" />

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-primary-foreground/90 mb-6 leading-relaxed">"{testimonial.text}"</p>

              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar || "/hero.png"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-primary-foreground/70">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
