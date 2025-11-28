import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CruiseDetail } from "@/components/cruise-detail"
import { BookingPanel } from "@/components/booking-panel"
import { CruiseItinerary } from "@/components/cruise-itinerary"
import { CruiseReviews } from "@/components/cruise-reviews"
import { RelatedCruises } from "@/components/related-cruises"

export const metadata = {
  title: "Royal Nile Experience - iCruiseEgypt",
  description: "Experience the magic of the Nile with our luxury 5-day cruise from Luxor to Aswan.",
}

export default async function CruiseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <CruiseDetail cruiseId={id} />
              <CruiseItinerary />
              <CruiseReviews />
            </div>
            <aside className="lg:w-96 shrink-0">
              <BookingPanel />
            </aside>
          </div>
          <RelatedCruises />
        </div>
      </div>
      <Footer />
    </main>
  )
}
