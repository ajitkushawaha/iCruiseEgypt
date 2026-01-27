import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const duration = searchParams.get('duration');
        const destination = searchParams.get('destination');

        // If ID is provided, return single cruise
        if (id) {
            const cruise = await prisma.cruise.findUnique({
                where: { id }
            });

            if (!cruise) {
                return NextResponse.json(
                    { success: false, error: 'Cruise not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({ success: true, data: cruise });
        }

        // Build where clause
        const where: any = {};

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = parseInt(minPrice);
            if (maxPrice) where.price.lte = parseInt(maxPrice);
        }

        if (duration) {
            where.duration = { contains: duration, mode: 'insensitive' };
        }

        if (destination) {
            where.OR = [
                { routeEn: { contains: destination, mode: 'insensitive' } },
                { routeAr: { contains: destination, mode: 'insensitive' } }
            ];
        }

        const cruises = await prisma.cruise.findMany({
            where,
            orderBy: { rating: 'desc' }
        });

        return NextResponse.json({ success: true, data: cruises });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Remove any ID that might be present in the body (especially from MongoDB migration)
        const { id, _id, ...data } = body;

        // Ensure required fields for Prisma are present
        if (!data.nameEn || !data.nameAr || !data.routeEn || !data.routeAr || !data.descriptionEn || !data.descriptionAr) {
            return NextResponse.json(
                { success: false, error: 'Missing required bilingual fields' },
                { status: 400 }
            );
        }

        const cruise = await prisma.cruise.create({
            data: {
                ...data,
                // Ensure price and rating are numbers
                price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
                rating: typeof data.rating === 'string' ? parseFloat(data.rating) : data.rating,
            }
        });

        return NextResponse.json({ success: true, data: cruise }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating cruise:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
