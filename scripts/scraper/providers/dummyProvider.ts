import { PrismaClient } from '@prisma/client';

// จำลองการดึงข้อมูลจากเว็บ
export async function scrape(prisma: PrismaClient) {
    console.log('[Dummy Scraper] เริ่มต้นจำลองการดึงข้อมูลหน้าเว็บ...');
    
    // 1. จำลองการหน่วงเวลา 2 วินาทีเหมือนบอทกำลังเปิดหน้าเว็บไปดึงข้อมูล
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('[Dummy Scraper] อ่านข้อมูล HTML จากหน้าเว็บสำเร็จ');

    // 2. จำลองข้อมูลที่แกะออกมาจาก HTML ได้
    const scrapedTrips = [
        {
            origin: 'กรุงเทพ',
            destination: 'เชียงใหม่',
            departureTime: new Date(new Date().setHours(20, 30, 0, 0)), // วันนี้ 20:30
            arrivalTime: new Date(new Date().setHours(20 + 10, 30, 0, 0)), // ถึงเช้าอีกวัน
            price: 650,
            availableSeats: 15,
            busType: 'VIP 24',
        },
        {
            origin: 'กรุงเทพ',
            destination: 'เชียงใหม่',
            departureTime: new Date(new Date().setHours(22, 0, 0, 0)),
            arrivalTime: new Date(new Date().setHours(22 + 10, 0, 0, 0)),
            price: 550,
            availableSeats: 30,
            busType: 'Gold Class',
        },
        {
            origin: 'เชียงใหม่',
            destination: 'เชียงราย',
            departureTime: new Date(new Date().setHours(9, 30, 0, 0)),
            arrivalTime: new Date(new Date().setHours(12, 45, 0, 0)),
            price: 350,
            availableSeats: 20,
            busType: 'V-Class',
        },
        {
            origin: 'เชียงใหม่',
            destination: 'เชียงราย',
            departureTime: new Date(new Date().setHours(14, 0, 0, 0)),
            arrivalTime: new Date(new Date().setHours(17, 15, 0, 0)),
            price: 350,
            availableSeats: 25,
            busType: 'V-Class',
        }
    ];

    // 3. นำข้อมูลที่ดึงมาได้ บันทึกลง PostgreSQL ผ่าน Prisma
    console.log('[Dummy Scraper] กำลังบันทึกข้อมูลลงฐานข้อมูล...');
    
    // หา หรือ สร้างบริษัท EasyGo Transport ขึ้นมาก่อน
    const company = await prisma.company.upsert({
        where: { name: 'EasyGo Transport' },
        update: {},
        create: {
            name: 'EasyGo Transport',
            logoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&q=80'
        }
    });

    let savedCount = 0;
    // วนลูปบันทึกเที่ยวรถ
    for (const trip of scrapedTrips) {
        await prisma.trip.create({
            data: {
                ...trip,
                companyId: company.id
            }
        });
        savedCount++;
    }

    console.log(`[Dummy Scraper] ✅ บันทึกสำเร็จ ${savedCount} เที่ยวรถ ของบริษัท ${company.name}`);
}
