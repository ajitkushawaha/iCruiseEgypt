'use client';

import Link from 'next/link';
import { Menu, Search, User, Anchor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/cruises', label: 'Cruises' },
        { href: '/destinations', label: 'Destinations' },
        { href: '/about', label: 'About Us' },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white shadow-lg border-b border-sand-200'
                : 'bg-gradient-to-r from-nile-900 via-nile-800 to-nile-900 border-b border-gold-500/20 shadow-lg'
                }`}
        >
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all ${isScrolled
                        ? 'bg-gradient-to-br from-gold-400 to-gold-600'
                        : 'bg-gradient-to-br from-gold-400 to-gold-600'
                        }`}>
                        <Anchor className="h-7 w-7 text-nile-900" />
                    </div>
                    <div className="flex flex-col">
                        <span className={`text-2xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-nile-900' : 'text-white'
                            }`}>
                            iCruise
                        </span>
                        <span className={`text-xs -mt-1 tracking-widest transition-colors ${isScrolled ? 'text-gold-600' : 'text-gold-400'
                            }`}>
                            EGYPT
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 font-medium transition-all rounded-lg ${isScrolled
                                ? 'text-nile-900 hover:text-gold-600 hover:bg-sand-50'
                                : 'text-white hover:text-gold-300 hover:bg-white/10'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center space-x-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`transition-colors ${isScrolled
                            ? 'text-nile-900 hover:text-gold-600 hover:bg-sand-50'
                            : 'text-white hover:text-gold-300 hover:bg-white/10'
                            }`}
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`transition-colors ${isScrolled
                            ? 'text-nile-900 hover:text-gold-600 hover:bg-sand-50'
                            : 'text-white hover:text-gold-300 hover:bg-white/10'
                            }`}
                    >
                        <User className="h-5 w-5" />
                    </Button>
                    <Button className="bg-white   hover:bg-gray-300 hover:to-gold-700 text-nile-900 font-bold shadow-lg">
                        Book Now
                    </Button>
                </div>

                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`transition-colors ${isScrolled ? 'text-nile-900' : 'text-white'
                                }`}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] bg-gradient-to-b from-nile-900 to-nile-800 border-l border-gold-500/20">
                        <div className="flex flex-col space-y-6 mt-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-lg font-medium text-sand-100 hover:text-gold-400 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="h-px bg-gold-500/20 my-4" />
                            <Button className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-nile-900 font-bold">
                                Book Now
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}
