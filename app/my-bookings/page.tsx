"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Loader2, Calendar, Users, CreditCard, Ship } from "lucide-react";
import { redirect } from "next/navigation";

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/");
    }

    if (status === "authenticated") {
      fetchBookings();
    }
  }, [status]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.success) {
        // Filter bookings for current user
        const userBookings = data.data.filter((b: any) => b.email === session?.user?.email);
        setBookings(userBookings);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-28 pb-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-serif font-bold mb-8">My Bookings</h1>

            {bookings.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Ship className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground mb-6">You haven't booked any cruises yet.</p>
                  <a href="/cruises" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Browse Cruises
                  </a>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-grow p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <CardTitle className="text-xl mb-1">{booking.cruiseName}</CardTitle>
                            <CardDescription>Confirmation: {booking.confirmationCode}</CardDescription>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                              {booking.status.toUpperCase()}
                            </Badge>
                            <Badge variant={booking.paymentStatus === 'paid' ? 'default' : 'outline'} className={booking.paymentStatus === 'paid' ? 'bg-green-500 hover:bg-green-600' : ''}>
                              {booking.paymentStatus.toUpperCase()}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(booking.date), 'PPP')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{booking.guests} Guests</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CreditCard className="h-4 w-4" />
                            <span>${booking.totalAmount}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Ship className="h-4 w-4" />
                            <span>{booking.paymentMethod || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
