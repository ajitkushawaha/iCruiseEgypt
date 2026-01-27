import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const city = searchParams.get('city');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const starRating = searchParams.get('starRating');
        const minRating = searchParams.get('minRating');

        // Build where clause
        const where: any = {};

        if (city) {
            where.OR = [
                { city: { contains: city, mode: 'insensitive' } },
                { locationEn: { contains: city, mode: 'insensitive' } },
                { locationAr: { contains: city, mode: 'insensitive' } },
            ];
        }

        if (minPrice || maxPrice) {
            where.pricePerNight = {};
            if (minPrice) where.pricePerNight.gte = parseFloat(minPrice);
            if (maxPrice) where.pricePerNight.lte = parseFloat(maxPrice);
        }

        if (starRating) {
            where.starRating = parseInt(starRating);
        }

        if (minRating) {
            where.rating = { gte: parseFloat(minRating) };
        }

        const hotels = await prisma.hotel.findMany({
            where,
            orderBy: [
                { rating: 'desc' },
                { starRating: 'desc' }
            ]
        });

        return NextResponse.json({ success: true, data: hotels });
    } catch (error: any) {
        console.error('Error fetching hotels:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.nameEn || !body.nameAr || !body.pricePerNight || !body.city) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const hotel = await prisma.hotel.create({
            data: {
                nameEn: body.nameEn,
                nameAr: body.nameAr,
                descriptionEn: body.descriptionEn || '',
                descriptionAr: body.descriptionAr || '',
                locationEn: body.locationEn || body.city,
                locationAr: body.locationAr || body.city,
                images: body.images || [],
                rating: body.rating || 0,
                amenities: body.amenities || [],
                pricePerNight: body.pricePerNight,
                currency: body.currency || 'USD',
                address: body.address || '',
                city: body.city,
                country: body.country || 'Egypt',
                lat: body.coordinates?.lat || null,
                lng: body.coordinates?.lng || null,
                starRating: body.starRating || 3,
            }
        });

        return NextResponse.json(
            { success: true, data: hotel },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating hotel:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
