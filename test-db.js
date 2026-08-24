const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

async function main() {
  console.log("Connecting to DB...");
  try {
    const users = await prisma.user.findMany({ take: 1 });
    console.log("Success! Users:", users);
  } catch (e) {
    console.error("DB Error:", e);
  }
}
main().finally(() => prisma.$disconnect());
