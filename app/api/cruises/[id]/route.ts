import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

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
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
