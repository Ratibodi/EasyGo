import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.company.updateMany({
    where: { name: { contains: 'สมบัติทัวร์' } },
    data: { logoUrl: '/logos/sombat.png' }
  });
  
  await prisma.company.updateMany({
    where: { name: { contains: 'นครชัยแอร์' } },
    data: { logoUrl: '/logos/nca.png' }
  });
  
  console.log('Logos updated successfully to local paths');
}
main().catch(console.error).finally(() => prisma.$disconnect());
