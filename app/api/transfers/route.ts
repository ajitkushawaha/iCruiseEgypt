import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const from = searchParams.get('from');
        const to = searchParams.get('to');
        const type = searchParams.get('type');
        const vehicleType = searchParams.get('vehicleType');
        const minCapacity = searchParams.get('minCapacity');
        const available = searchParams.get('available');

        // Build query
        let where: any = {};

        if (from) {
            where.OR = [
                { fromLocationEn: { contains: from, mode: 'insensitive' } },
                { fromLocationAr: { contains: from, mode: 'insensitive' } },
            ];
        }

        if (to) {
            const toWhere = {
                OR: [
                    { toLocationEn: { contains: to, mode: 'insensitive' } },
                    { toLocationAr: { contains: to, mode: 'insensitive' } },
                ]
            };
            
            if (where.OR) {
                // Combine with AND logic
                where = { AND: [{ OR: where.OR }, toWhere] };
            } else {
                Object.assign(where, toWhere);
            }
        }

        if (type && ['airport', 'hotel', 'port', 'custom'].includes(type)) {
            where.type = type;
        }

        if (vehicleType && ['sedan', 'van', 'bus', 'luxury'].includes(vehicleType)) {
            where.vehicleType = vehicleType;
        }

        if (minCapacity) {
            where.capacity = { gte: parseInt(minCapacity) };
        }

        if (available === 'true') {
            where.available = true;
        }

        const transfers = await prisma.transfer.findMany({
            where,
            orderBy: { price: 'asc' }
        });

        return NextResponse.json({ success: true, data: transfers });
    } catch (error: any) {
        console.error('Error fetching transfers:', error);
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
        if (!body.nameEn || !body.nameAr || !body.type || !body.price) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const transfer = await prisma.transfer.create({
            data: {
                nameEn: body.nameEn,
                nameAr: body.nameAr,
                descriptionEn: body.descriptionEn || '',
                descriptionAr: body.descriptionAr || '',
                fromLocationEn: body.fromLocationEn || '',
                fromLocationAr: body.fromLocationAr || '',
                toLocationEn: body.toLocationEn || '',
                toLocationAr: body.toLocationAr || '',
                type: body.type,
                vehicleType: body.vehicleType || 'sedan',
                capacity: body.capacity || 4,
                price: body.price,
                currency: body.currency || 'USD',
                duration: body.duration || 60,
                image: body.image,
                available: body.available !== false,
            }
        });

        return NextResponse.json(
            { success: true, data: transfer },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating transfer:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

