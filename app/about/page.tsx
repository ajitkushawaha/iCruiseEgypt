import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Globe, Headphones, Shield, Ship, Users } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "About Us - iCruiseEgypt",
  description:
    "Egypt's premier digital marketplace for cruise tourism. Learn about our mission to revolutionize Egyptian cruise travel.",
}

const stats = [
  { value: "150+", label: "Cruise Ships" },
  { value: "50K+", label: "Happy Travelers" },
  { value: "12", label: "Destinations" },
  { value: "98%", label: "Satisfaction Rate" },
]

const values = [
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Every booking is protected with enterprise-grade security. Your data and payments are always safe.",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "All cruise operators are vetted and certified. We only partner with the best in the industry.",
  },
  {
    icon: Globe,
    title: "Local Expertise",
    description: "Deep knowledge of Egyptian tourism combined with world-class technology and service.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated team is available around the clock to assist with any questions or concerns.",
  },
]

const team = [
  {
    name: "Magdy G. El-Sebaie",
    role: "Founder & CEO",
    image: "/hero.png",
  },
  {
    name: "Sarah Ahmed",
    role: "Head of Operations",
    image: "/deck.png",
  },
  {
    name: "Omar Hassan",
    role: "Technology Director",
    image: "/cabin.png",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 md:pt-24">
        {/* Hero Section */}
        <div className="relative py-24 md:py-32">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/hero.png')`,
            }}
          >
            <div className="absolute inset-0 bg-foreground/70" />
          </div>
          <div className="relative container mx-auto px-4 text-center text-white">
            <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-6">
              About iCruiseEgypt
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Revolutionizing Egypt's Cruise Tourism
            </h1>
            <p className="text-white/90 max-w-3xl mx-auto text-lg leading-relaxed">
              We're building the first unified digital marketplace for Egypt's cruise industry, connecting travelers
              with unforgettable experiences on the Nile and Red Sea.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-secondary font-medium text-sm tracking-wider uppercase">Our Mission</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                  Making Egypt the Digital Leader in Cruise Tourism
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Egypt's cruise tourism has long been fragmented and difficult to navigate. Multiple operators, manual
                  booking processes, and limited online visibility have held back the industry's potential.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  iCruiseEgypt changes everything. We've built a smart, AI-powered platform that centralizes all cruise
                  offerings, provides seamless booking for both travelers and businesses, and delivers the data-driven
                  insights needed to grow Egypt's tourism sector.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our vision is to position Egypt as the leading cruise tourism hub in the MENA region, serving as a
                  model for digital transformation in the travel industry.
                </p>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/hero.png"
                  alt="Luxury Nile Cruise"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-secondary font-medium text-sm tracking-wider uppercase">Our Values</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">What We Stand For</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="bg-card rounded-2xl p-8 text-center border border-border">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-secondary font-medium text-sm tracking-wider uppercase">Our Team</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">Meet the Leadership</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden mx-auto mb-6">
                    <Image src={member.image || "/hero.png"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Ship className="h-8 w-8 text-secondary" />
              <Users className="h-8 w-8 text-secondary" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Partner With Us</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              We're seeking strategic tech and tourism partners to co-build the first cruise-tech platform in MENA.
              Let's make Egypt the digital leader in cruise tourism together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/partners">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Become a Partner
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cruises">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                >
                  Explore Cruises
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
