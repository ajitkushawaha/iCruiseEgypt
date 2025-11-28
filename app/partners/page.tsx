import { PartnerSidebar } from "@/components/partner-sidebar"
import { PartnerDashboard } from "@/components/partner-dashboard"

export const metadata = {
  title: "Partner Dashboard - iCruiseEgypt",
  description: "Manage your cruise listings, bookings, and analytics.",
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-muted">
      <div className="flex">
        <PartnerSidebar />
        <main className="flex-1 p-6 lg:p-8 ml-0 lg:ml-64">
          <PartnerDashboard />
        </main>
      </div>
    </div>
  )
}
