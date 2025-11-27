import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import { MapPin, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const destinations = [
    {
        name: 'Luxor',
        description: 'The world\'s greatest open-air museum, home to the Valley of the Kings and Karnak Temple.',
        image: '/hero.png',
        highlights: ['Valley of the Kings', 'Karnak Temple', 'Luxor Temple', 'Hatshepsut Temple'],
        cruises: 4,
    },
    {
        name: 'Aswan',
        description: 'A tranquil Nubian city known for its beautiful islands and the magnificent Philae Temple.',
        image: '/deck.png',
        highlights: ['Philae Temple', 'High Dam', 'Unfinished Obelisk', 'Nubian Villages'],
        cruises: 5,
    },
    {
        name: 'Cairo',
        description: 'Egypt\'s vibrant capital, gateway to the iconic Pyramids of Giza and the Egyptian Museum.',
        image: '/cabin.png',
        highlights: ['Pyramids of Giza', 'Egyptian Museum', 'Khan el-Khalili', 'Citadel of Saladin'],
        cruises: 2,
    },
];

export default function DestinationsPage() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-blue-900 text-white pt-24 pb-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Egypt's Wonders</h1>
                    <p className="text-blue-200 text-lg max-w-2xl">
                        Discover the ancient treasures and timeless beauty of Egypt's most iconic destinations along the Nile.
                    </p>
                </div>
            </div>

            {/* Destinations Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="space-y-16">
                    {destinations.map((destination, index) => (
                        <div
                            key={destination.name}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
                        >
                            {/* Image */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                                    <Image
                                        src={destination.image}
                                        alt={destination.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full lg:w-1/2 space-y-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                                        <MapPin className="h-8 w-8 text-amber-500" />
                                        {destination.name}
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {destination.description}
                                    </p>
                                </div>

                                {/* Highlights */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Top Highlights</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {destination.highlights.map((highlight) => (
                                            <div key={highlight} className="flex items-center gap-2 text-gray-700">
                                                <Star className="h-4 w-4 text-amber-500 fill-current" />
                                                <span>{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="flex items-center gap-4 pt-4">
                                    <Link href={`/cruises?destination=${destination.name}`}>
                                        <Button className="bg-blue-900 hover:bg-blue-800">
                                            View {destination.cruises} Cruises
                                        </Button>
                                    </Link>
                                    <p className="text-sm text-gray-500">
                                        <Clock className="h-4 w-4 inline mr-1" />
                                        3-8 day cruises available
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
