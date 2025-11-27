import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Award, Users, Shield, Heart } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] w-full">
                <Image
                    src="/hero.png"
                    alt="About iCruiseEgypt"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">About iCruiseEgypt</h1>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto px-4">
                            Your trusted partner for unforgettable Nile cruise experiences since 2010
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Story */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Our Story</h2>
                    <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                        <p>
                            Founded in 2010, iCruiseEgypt has been dedicated to providing exceptional Nile cruise experiences
                            that combine luxury, culture, and adventure. We believe that exploring Egypt's ancient wonders
                            should be as comfortable and memorable as the destinations themselves.
                        </p>
                        <p>
                            Our carefully curated fleet of premium vessels offers world-class amenities, expert guides,
                            and personalized service that has earned us the trust of thousands of travelers from around the globe.
                        </p>
                        <p>
                            From the majestic temples of Luxor to the serene beauty of Aswan, we ensure every moment
                            of your journey is filled with wonder, comfort, and authentic Egyptian hospitality.
                        </p>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="h-8 w-8 text-blue-900" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
                            <p className="text-gray-600">
                                We maintain the highest standards in every aspect of our service.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-8 w-8 text-blue-900" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Safety</h3>
                            <p className="text-gray-600">
                                Your safety and security are our top priorities on every voyage.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="h-8 w-8 text-blue-900" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Passion</h3>
                            <p className="text-gray-600">
                                We love Egypt and are passionate about sharing its wonders with you.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-blue-900" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Community</h3>
                            <p className="text-gray-600">
                                We support local communities and sustainable tourism practices.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-blue-900 mb-2">15+</div>
                        <div className="text-gray-600">Years of Experience</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-blue-900 mb-2">50K+</div>
                        <div className="text-gray-600">Happy Travelers</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-blue-900 mb-2">20+</div>
                        <div className="text-gray-600">Luxury Vessels</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-blue-900 mb-2">4.9</div>
                        <div className="text-gray-600">Average Rating</div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
