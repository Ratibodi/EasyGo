const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Altering email column...");
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL`);
    console.log("Email is now nullable!");
  } catch(e) { console.error(e.message); }
  
  console.log("Done");
}
main().finally(() => prisma.$disconnect());
