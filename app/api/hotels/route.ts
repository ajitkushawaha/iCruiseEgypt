import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hotel from '@/models/Hotel';

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const searchParams = request.nextUrl.searchParams;
        const city = searchParams.get('city');
        const available = searchParams.get('available');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const starRating = searchParams.get('starRating');
        const minRating = searchParams.get('minRating');

        // Build query
        const query: any = {};

        if (city) {
            query.$or = [
                { city: { $regex: city, $options: 'i' } },
                { locationEn: { $regex: city, $options: 'i' } },
                { locationAr: { $regex: city, $options: 'i' } },
            ];
        }

        if (available === 'true') {
            // For now, we consider all hotels available
            // You can add an 'available' field to the schema if needed
        }

        if (minPrice || maxPrice) {
            query.pricePerNight = {};
            if (minPrice) query.pricePerNight.$gte = parseFloat(minPrice);
            if (maxPrice) query.pricePerNight.$lte = parseFloat(maxPrice);
        }

        if (starRating) {
            query.starRating = parseInt(starRating);
        }

        if (minRating) {
            query.rating = { $gte: parseFloat(minRating) };
        }

        const hotels = await Hotel.find(query).sort({ rating: -1, starRating: -1 });

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
        await connectDB();

        const body = await request.json();

        // Validate required fields
        if (!body.nameEn || !body.nameAr || !body.pricePerNight || !body.city) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const hotel = await Hotel.create({
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
            coordinates: body.coordinates,
            starRating: body.starRating || 3,
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

