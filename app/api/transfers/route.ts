import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Transfer from '@/models/Transfer';

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const searchParams = request.nextUrl.searchParams;
        const from = searchParams.get('from');
        const to = searchParams.get('to');
        const type = searchParams.get('type');
        const vehicleType = searchParams.get('vehicleType');
        const minCapacity = searchParams.get('minCapacity');
        const available = searchParams.get('available');

        // Build query
        let query: any = {};

        if (from) {
            query.$or = [
                { fromLocationEn: { $regex: from, $options: 'i' } },
                { fromLocationAr: { $regex: from, $options: 'i' } },
            ];
        }

        if (to) {
            const toQuery: any = {
                $or: [
                    { toLocationEn: { $regex: to, $options: 'i' } },
                    { toLocationAr: { $regex: to, $options: 'i' } },
                ]
            };
            
            if (query.$or) {
                // Combine with AND logic
                query = { $and: [query, toQuery] };
            } else {
                Object.assign(query, toQuery);
            }
        }

        if (type && ['airport', 'hotel', 'port', 'custom'].includes(type)) {
            query.type = type;
        }

        if (vehicleType && ['sedan', 'van', 'bus', 'luxury'].includes(vehicleType)) {
            query.vehicleType = vehicleType;
        }

        if (minCapacity) {
            query.capacity = { $gte: parseInt(minCapacity) };
        }

        if (available === 'true') {
            query.available = true;
        }

        const transfers = await Transfer.find(query).sort({ price: 1 });

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
        await connectDB();

        const body = await request.json();

        // Validate required fields
        if (!body.nameEn || !body.nameAr || !body.type || !body.price) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const transfer = await Transfer.create({
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

