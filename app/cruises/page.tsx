'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CruiseCard, Cruise } from '@/components/cruises/CruiseCard';
import { CruiseFilters } from '@/components/cruises/CruiseFilters';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';

export default function CruisesPage() {
    const [cruises, setCruises] = useState<Cruise[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 5000,
        duration: '',
        destination: '',
    });

    useEffect(() => {
        async function fetchCruises() {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (filters.minPrice > 0) params.append('minPrice', filters.minPrice.toString());
                if (filters.maxPrice < 5000) params.append('maxPrice', filters.maxPrice.toString());
                if (filters.duration) params.append('duration', filters.duration);
                if (filters.destination) params.append('destination', filters.destination);

                const res = await fetch(`/api/cruises?${params.toString()}`);
                const data = await res.json();
                if (data.success) {
                    setCruises(data.data);
                }
            } catch (error) {
                console.error('Error fetching cruises:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCruises();
    }, [filters]);

    return (
        <main className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* Page Header */}
            <div className="bg-blue-900 text-white pt-24 pb-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Cruise</h1>
                    <p className="text-blue-200 text-lg max-w-2xl">
                        Browse our curated selection of luxury Nile cruises. Filter by price, duration, and destination to find your dream voyage.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Mobile Filter Button */}
                    <div className="lg:hidden mb-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="w-full flex gap-2">
                                    <Filter className="h-4 w-4" />
                                    Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                <div className="py-6">
                                    <h2 className="text-xl font-bold text-blue-900 mb-6">Filters</h2>
                                    <CruiseFilters onFilterChange={setFilters} />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold text-blue-900 mb-6">Filters</h2>
                            <CruiseFilters onFilterChange={setFilters} />
                        </div>
                    </aside>

                    {/* Cruise Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-xl" />
                                ))}
                            </div>
                        ) : cruises.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No cruises found matching your filters.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {cruises.map((cruise) => (
                                    <CruiseCard key={cruise._id || cruise.id} cruise={cruise} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
