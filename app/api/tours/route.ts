import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tour from '@/models/Tour';

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const searchParams = request.nextUrl.searchParams;
        const location = searchParams.get('location');
        const category = searchParams.get('category');
        const available = searchParams.get('available');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const minRating = searchParams.get('minRating');

        // Build query
        const query: any = {};

        if (location) {
            query.$or = [
                { locationEn: { $regex: location, $options: 'i' } },
                { locationAr: { $regex: location, $options: 'i' } },
            ];
        }

        if (category && ['historical', 'adventure', 'cultural', 'leisure', 'photography'].includes(category)) {
            query.category = category;
        }

        if (available === 'true') {
            query.available = true;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        if (minRating) {
            query.rating = { $gte: parseFloat(minRating) };
        }

        const tours = await Tour.find(query).sort({ rating: -1, price: 1 });

        return NextResponse.json({ success: true, data: tours });
    } catch (error: any) {
        console.error('Error fetching tours:', error);
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
        if (!body.nameEn || !body.nameAr || !body.price || !body.category) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const tour = await Tour.create({
            nameEn: body.nameEn,
            nameAr: body.nameAr,
            descriptionEn: body.descriptionEn || '',
            descriptionAr: body.descriptionAr || '',
            images: body.images || [],
            duration: body.duration || '3 hours',
            durationHours: body.durationHours || 3,
            price: body.price,
            currency: body.currency || 'USD',
            category: body.category,
            locationEn: body.locationEn || '',
            locationAr: body.locationAr || '',
            itinerary: body.itinerary || [],
            includes: body.includes || [],
            excludes: body.excludes || [],
            meetingPointEn: body.meetingPointEn || '',
            meetingPointAr: body.meetingPointAr || '',
            available: body.available !== false,
            maxParticipants: body.maxParticipants || 20,
            rating: body.rating || 0,
        });

        return NextResponse.json(
            { success: true, data: tour },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating tour:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

