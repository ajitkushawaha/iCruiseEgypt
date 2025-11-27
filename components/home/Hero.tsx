'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Sparkles } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useState } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export function Hero() {
    const [date, setDate] = useState<Date>();
    const [destination, setDestination] = useState<string>('');
    const [guests, setGuests] = useState<string>('');
    const router = useRouter();

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (destination) params.append('destination', destination);
        if (date) params.append('date', format(date, 'yyyy-MM-dd'));
        if (guests) params.append('guests', guests);

        router.push(`/cruises?${params.toString()}`);
    };

    return (
        <div className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <Image
                src="/hero.png"
                alt="Nile Cruise"
                fill
                className="object-cover"
                priority
            />

            {/* Decorative Glow Elements */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-gold-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500/30 backdrop-blur-md border border-gold-400/40 rounded-full mb-6 shadow-lg animate-fade-in">
                    <Sparkles className="h-4 w-4 text-gold-300" />
                    <span className="text-gold-100 text-sm font-semibold tracking-wide">Luxury Nile Cruises Since 2010</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                    Discover the Magic of
                    <span className="block bg-gradient-to-r from-gold-300 via-amber-200 to-gold-400 bg-clip-text text-transparent mt-2 drop-shadow-lg">
                        Ancient Egypt
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-amber-50 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-lg font-medium">
                    Sail through history on a luxury Nile cruise. Experience timeless wonders,
                    world-class comfort, and unforgettable memories.
                </p>

                {/* Search Card */}
                <div className="max-w-5xl mx-auto bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-gold-300/50">
                    <div className="flex flex-col md:flex-row gap-4 items-end">

                        {/* Destination */}
                        <div className="w-full md:flex-1 text-left">
                            <label className="text-xs font-bold text-nile-800 uppercase tracking-wide mb-2 block">
                                Destination
                            </label>
                            <Select onValueChange={setDestination}>
                                <SelectTrigger className="w-full h-12 border-2 border-sand-200 hover:border-gold-400 focus:border-gold-500 rounded-lg bg-white transition-colors">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-gold-600" />
                                        <SelectValue placeholder="Where to?" className="text-gray-700" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Luxor">Luxor to Aswan</SelectItem>
                                    <SelectItem value="Aswan">Aswan to Luxor</SelectItem>
                                    <SelectItem value="Cairo">Cairo to Luxor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Date Picker */}
                        <div className="w-full md:flex-1 text-left">
                            <label className="text-xs font-bold text-nile-800 uppercase tracking-wide mb-2 block">
                                Travel Date
                            </label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full h-12 justify-start text-left font-medium border-2 border-sand-200 hover:border-gold-400 focus:border-gold-500 rounded-lg bg-white transition-colors"
                                    >
                                        <Calendar className="mr-3 h-5 w-5 text-gold-600" />
                                        {date ? (
                                            <span className="text-gray-700">{format(date, "PPP")}</span>
                                        ) : (
                                            <span className="text-gray-500">Select date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Guests */}
                        <div className="w-full md:w-48 text-left">
                            <label className="text-xs font-bold text-nile-800 uppercase tracking-wide mb-2 block">
                                Guests
                            </label>
                            <Select onValueChange={setGuests}>
                                <SelectTrigger className="w-full h-12 border-2 border-sand-200 hover:border-gold-400 focus:border-gold-500 rounded-lg bg-white transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Users className="h-5 w-5 text-gold-600" />
                                        <SelectValue placeholder="2 Guests" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 Guest</SelectItem>
                                    <SelectItem value="2">2 Guests</SelectItem>
                                    <SelectItem value="3">3 Guests</SelectItem>
                                    <SelectItem value="4+">4+ Guests</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Search Button */}
                        <Button
                            onClick={handleSearch}
                            className="w-full md:w-auto h-12 px-10 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-nile-900 font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                        >
                            Search Cruises
                        </Button>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 flex flex-wrap justify-center gap-8 text-amber-50">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-gold-300 rounded-full animate-pulse" />
                        <span className="text-sm font-medium drop-shadow-md">50,000+ Happy Travelers</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-gold-300 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                        <span className="text-sm font-medium drop-shadow-md">4.9★ Average Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-gold-300 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                        <span className="text-sm font-medium drop-shadow-md">Best Price Guarantee</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
