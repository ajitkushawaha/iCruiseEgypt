import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CruiseDetail } from "@/components/cruise-detail"
import { BookingForm } from "@/components/booking/BookingForm"
import { CruiseItinerary } from "@/components/cruise-itinerary"
import { CruiseReviews } from "@/components/cruise-reviews"
import { RelatedCruises } from "@/components/related-cruises"
import { CheckCircle2, ShieldCheck, Zap, Clock, CreditCard } from "lucide-react"

async function getCruise(id: string) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/cruises/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error("Error fetching cruise:", error)
    return null
  }
}

export default async function CruiseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cruise = await getCruise(id)

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
              <div className="sticky top-24 space-y-6">
                {cruise && (
                  <>
                    <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
                      <div className="flex items-baseline justify-between mb-6">
                        <div>
                          <span className="text-muted-foreground line-through text-sm">${Math.round(cruise.price * 1.2)}</span>
                          <div className="text-3xl font-bold text-primary">
                            ${cruise.price}
                            <span className="text-base font-normal text-muted-foreground">/person</span>
                          </div>
                        </div>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">18% OFF</div>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Zap className="h-4 w-4 text-amber-500" />
                          <span>Instant confirmation</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span>Free cancellation up to 48h before</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <ShieldCheck className="h-4 w-4 text-green-500" />
                          <span>Best Price Guarantee</span>
                        </div>
                      </div>

                      <BookingForm 
                        cruiseId={id} 
                        cruiseName={cruise.nameEn} 
                        price={cruise.price} 
                      />

                      <div className="mt-6 pt-6 border-t border-border">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">What's included:</p>
                        <ul className="space-y-2">
                          {['All Meals Included', 'Guided Sightseeing', 'Airport Transfers', 'Luxury Cabin'].map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl border border-blue-100 p-4 flex items-center gap-4">
                      <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-blue-900">Secure Payment</p>
                        <p className="text-xs text-blue-700">All transactions are encrypted</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </aside>
          </div>
          <RelatedCruises />
        </div>
      </div>
      <Footer />
    </main>
  )
}
