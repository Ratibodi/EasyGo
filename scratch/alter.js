const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Altering table...");
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN "lineId" TEXT UNIQUE`);
    console.log("Added lineId");
  } catch(e) { console.log(e.message); }
  
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN "image" TEXT`);
    console.log("Added image");
  } catch(e) { console.log(e.message); }
  
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN "companyId" TEXT`);
    console.log("Added companyId");
  } catch(e) { console.log(e.message); }
  
  console.log("Done");
}
main().finally(() => prisma.$disconnect());
