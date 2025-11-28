import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCruises } from "@/components/featured-cruises"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Destinations } from "@/components/destinations"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedCruises />
      <WhyChooseUs />
      <Destinations />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  )
}
