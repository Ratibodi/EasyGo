import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const dateStr = searchParams.get('date');

    try {
        // ค้นหาเที่ยวรถจาก Database
        let trips = await prisma.trip.findMany({
            where: {
                ...(from && { origin: from }),
                ...(to && { destination: to }),
            },
            include: {
                company: true // ให้ดึงชื่อบริษัทและโลโก้มาด้วย
            },
            orderBy: {
                departureTime: 'asc'
            }
        });

        // จำลองข้อมูล: ถ้าระบุวันที่มา ให้แก้เวลาออกรถ/ถึง ให้ตรงกับวันที่เลือก (เพื่อประโยชน์ในการทำ Mockup)
        if (dateStr && trips.length > 0) {
            const [year, month, day] = dateStr.split('-');
            if (year && month && day) {
                trips = trips.map(trip => {
                    const originalDep = new Date(trip.departureTime);
                    const originalArr = new Date(trip.arrivalTime);
                    
                    const newDep = new Date(Number(year), Number(month) - 1, Number(day), originalDep.getHours(), originalDep.getMinutes(), originalDep.getSeconds());
                    // คำนวณความห่างของเวลาถึงและเวลาออกรถ
                    const duration = originalArr.getTime() - originalDep.getTime();
                    const newArr = new Date(newDep.getTime() + duration);

                    return {
                        ...trip,
                        departureTime: newDep,
                        arrivalTime: newArr
                    };
                });
            }
        }

        return NextResponse.json({
            success: true,
            total: trips.length,
            data: trips
        });

    } catch (error) {
        console.error('Error fetching trips:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch trips' }, { status: 500 });
    }
}
