import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Star } from 'lucide-react';
import Link from 'next/link';

export interface Cruise {
    _id?: string;
    id: number | string;
    name: string;
    image: string;
    duration: string;
    route: string;
    rating: number;
    price: number;
    tags: string[];
}

interface CruiseCardProps {
    cruise: Cruise;
}

export function CruiseCard({ cruise }: CruiseCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-sand-200 hover:border-gold-400 bg-white group">
            <CardHeader className="p-0 relative">
                <div className="relative h-56 w-full overflow-hidden">
                    <Image
                        src={cruise.image}
                        alt={cruise.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-nile-900/60 to-transparent" />

                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        {cruise.tags.map((tag) => (
                            <Badge
                                key={tag}
                                className="bg-gold-500/90 backdrop-blur-sm text-nile-900 border-none font-bold shadow-lg"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Rating */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                        <Star className="h-4 w-4 text-gold-500 fill-current" />
                        <span className="font-bold text-nile-900">{cruise.rating}</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-5 space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-nile-900 mb-2 group-hover:text-gold-600 transition-colors">
                        {cruise.name}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gold-600" />
                            <span className="font-medium">{cruise.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gold-600" />
                            <span className="font-medium">{cruise.route}</span>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t-2 border-sand-100 pt-4 px-5 pb-5 bg-gradient-to-br from-sand-50 to-white mt-auto">
                <div>
                    <p className="text-xs text-gray-500 font-medium">Starting from</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-nile-800 to-nile-600 bg-clip-text text-transparent">
                        ${cruise.price}
                    </p>
                </div>
                <Link href={`/cruises/${cruise._id || cruise.id}`}>
                    <Button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-nile-900 font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                        View Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
