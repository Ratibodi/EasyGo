const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`
    SELECT column_name, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'User' AND column_name = 'email';
  `;
  console.log(result);
}
main().finally(() => prisma.$disconnect());
