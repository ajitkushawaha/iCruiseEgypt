import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TripPlannerForm } from "@/components/trip-planner-form"
import { TripPlannerResults } from "@/components/trip-planner-results"

export const metadata = {
  title: "Smart Trip Planner - iCruiseEgypt",
  description: "Plan your perfect Egyptian cruise adventure with our AI-powered trip planner.",
}

export default function TripPlannerPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 md:pt-24">
        <div className="bg-primary py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              AI-Powered
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Smart Trip Planner
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Tell us your preferences and let our AI create the perfect cruise itinerary for you
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <TripPlannerForm />
            <TripPlannerResults />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
