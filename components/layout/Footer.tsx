import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
    return (
        <footer className="bg-blue-950 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="text-2xl font-bold tracking-tight mb-6 block">
                            iCruise<span className="text-amber-500">Egypt</span>
                        </Link>
                        <p className="text-blue-200 mb-6">
                            Your premier gateway to the timeless wonders of the Nile. We specialize in luxury cruise experiences tailored to your desires.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-amber-500 transition-colors"><Facebook className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-amber-500 transition-colors"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-amber-500 transition-colors"><Twitter className="h-5 w-5" /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/cruises" className="text-blue-200 hover:text-white transition-colors">Find a Cruise</Link></li>
                            <li><Link href="/destinations" className="text-blue-200 hover:text-white transition-colors">Destinations</Link></li>
                            <li><Link href="/about" className="text-blue-200 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/blog" className="text-blue-200 hover:text-white transition-colors">Travel Blog</Link></li>
                            <li><Link href="/contact" className="text-blue-200 hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-blue-200">
                                <MapPin className="h-5 w-5 shrink-0 text-amber-500" />
                                <span>123 Nile Corniche, Luxor, Egypt</span>
                            </li>
                            <li className="flex items-center gap-3 text-blue-200">
                                <Phone className="h-5 w-5 shrink-0 text-amber-500" />
                                <span>+20 123 456 7890</span>
                            </li>
                            <li className="flex items-center gap-3 text-blue-200">
                                <Mail className="h-5 w-5 shrink-0 text-amber-500" />
                                <span>info@icruiseegypt.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
                        <p className="text-blue-200 mb-4">Subscribe for exclusive offers and travel tips.</p>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Your email"
                                className="bg-blue-900/50 border-blue-800 text-white placeholder:text-blue-400 focus-visible:ring-amber-500"
                            />
                            <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                                Join
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-blue-900 pt-8 text-center text-blue-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} iCruiseEgypt. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
