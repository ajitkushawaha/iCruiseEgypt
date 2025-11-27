'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CruiseCard, Cruise } from '@/components/cruises/CruiseCard';
import Link from 'next/link';

export function FeaturedCruises() {
    const [cruises, setCruises] = useState<Cruise[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCruises() {
            try {
                const res = await fetch('/api/cruises');
                const data = await res.json();
                if (data.success) {
                    // Get top 3 cruises
                    setCruises(data.data.slice(0, 3));
                }
            } catch (error) {
                console.error('Error fetching cruises:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCruises();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Featured Cruises</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Handpicked selection of the finest Nile cruises. Experience luxury, history, and comfort.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-xl" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gradient-to-b from-sand-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-2 bg-gold-100 rounded-full mb-4">
                        <span className="text-gold-700 font-bold text-sm uppercase tracking-wide">Handpicked Selection</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-nile-900 to-nile-700 bg-clip-text text-transparent mb-4">
                        Featured Cruises
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Experience luxury, history, and comfort on the finest Nile cruises
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cruises.map((cruise) => (
                        <CruiseCard key={cruise._id || cruise.id} cruise={cruise} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/cruises">
                        <Button size="lg" className="bg-gradient-to-r from-nile-800 to-nile-700 hover:from-nile-900 hover:to-nile-800 text-white font-bold px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            View All Cruises
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
