import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookingForm } from '@/components/booking/BookingForm';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Star, Wifi, Utensils, Waves, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

async function getCruise(id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/cruises/${id}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error('Error fetching cruise:', error);
        return null;
    }
}

export default async function CruiseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const cruise = await getCruise(id);

    if (!cruise) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] w-full">
                <Image
                    src={cruise.image}
                    alt={cruise.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent pt-20 pb-10">
                    <div className="container mx-auto px-4 text-white">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {cruise.tags.map((tag: string) => (
                                <Badge key={tag} className="bg-amber-500 text-white border-none text-sm px-3 py-1">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">{cruise.name}</h1>
                        <div className="flex items-center gap-4 text-lg text-gray-200">
                            <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 text-amber-400 fill-current" />
                                <span className="font-bold text-white">{cruise.rating}</span>
                                <span className="text-sm">(120 Reviews)</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-5 w-5" />
                                {cruise.route}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content */}
                    <div className="flex-1 space-y-12">

                        {/* Overview */}
                        <section>
                            <h2 className="text-2xl font-bold text-blue-900 mb-4">Overview</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {cruise.description}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg text-center">
                                    <Clock className="h-8 w-8 text-blue-500 mb-2" />
                                    <span className="font-semibold text-gray-900">Duration</span>
                                    <span className="text-sm text-gray-500">{cruise.duration}</span>
                                </div>
                                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg text-center">
                                    <Wifi className="h-8 w-8 text-blue-500 mb-2" />
                                    <span className="font-semibold text-gray-900">Wifi</span>
                                    <span className="text-sm text-gray-500">Available</span>
                                </div>
                                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg text-center">
                                    <Utensils className="h-8 w-8 text-blue-500 mb-2" />
                                    <span className="font-semibold text-gray-900">Dining</span>
                                    <span className="text-sm text-gray-500">Full Board</span>
                                </div>
                                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg text-center">
                                    <Waves className="h-8 w-8 text-blue-500 mb-2" />
                                    <span className="font-semibold text-gray-900">Pool</span>
                                    <span className="text-sm text-gray-500">Sun Deck</span>
                                </div>
                            </div>
                        </section>

                        {/* Itinerary */}
                        <section>
                            <h2 className="text-2xl font-bold text-blue-900 mb-6">Itinerary</h2>
                            <div className="space-y-6 relative border-l-2 border-blue-100 ml-3 pl-8 pb-4">
                                {cruise.itinerary.map((item: any, index: number) => (
                                    <div key={index} className="relative">
                                        <div className="absolute -left-[41px] top-0 h-6 w-6 rounded-full bg-blue-500 border-4 border-white shadow-sm" />
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Day {item.day}: {item.title}</h3>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Amenities */}
                        <section>
                            <h2 className="text-2xl font-bold text-blue-900 mb-6">Onboard Amenities</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {cruise.amenities.map((amenity: string, index: number) => (
                                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <ShieldCheck className="h-5 w-5 text-green-500" />
                                        <span className="text-gray-700 font-medium">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Sidebar (Booking) */}
                    <aside className="lg:w-[380px] shrink-0">
                        <div className="sticky top-24 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                            <div className="mb-6">
                                <p className="text-sm text-gray-500 mb-1">Starting from</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-blue-900">${cruise.price}</span>
                                    <span className="text-gray-500">/ person</span>
                                </div>
                                <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
                                    <ShieldCheck className="h-3 w-3" /> Best Price Guarantee
                                </p>
                            </div>

                            <BookingForm cruiseId={cruise._id} cruiseName={cruise.name} price={cruise.price} />

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-500 mb-4">Need help booking?</p>
                                <Button variant="outline" className="w-full">
                                    Contact Support
                                </Button>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>

            <Footer />
        </main>
    );
}
