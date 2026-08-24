import { PrismaClient } from '@prisma/client';
import { scrape as dummyScrape } from './providers/dummyProvider';
import { scrape as sombatScrape } from './providers/sombatProvider';
import { scrape as nakhonchaiScrape } from './providers/nakhonchaiProvider';

const prisma = new PrismaClient();

async function runAllScrapers() {
    console.log('🚀 เริ่มต้นการทำ Batch Scraping ข้อมูลตั๋วรถ...\n');

    try {
        // วิ่งไปดึงข้อมูลจาก Provider ทีละเจ้า
        await dummyScrape(prisma);
        
        // ดึงข้อมูลจำลองสมบัติทัวร์
        await sombatScrape(prisma);

        // ดึงข้อมูลจำลองนครชัยแอร์
        await nakhonchaiScrape(prisma);

        console.log('\n✅ ดึงข้อมูลและอัปเดตลง Database สำเร็จทั้งหมด!');
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาดในการรัน Scraper:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// สั่งรัน
runAllScrapers();
