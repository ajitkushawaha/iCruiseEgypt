import { Shield, Headphones, CreditCard, Award } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your payments are protected with enterprise-grade security and encryption.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our AI-powered chatbot and human agents are available around the clock.",
  },
  {
    icon: CreditCard,
    title: "Best Price Guarantee",
    description: "Find a lower price? We'll match it and give you an additional 10% off.",
  },
  {
    icon: Award,
    title: "Verified Partners",
    description: "All cruise operators are vetted and certified for quality and safety.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-secondary font-medium text-sm tracking-wider uppercase">Why Choose Us</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">The Smart Way to Cruise</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 text-center hover:shadow-lg transition-shadow border border-border"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
