const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.upsert({
      where: { lineId: "test-line-id" },
      update: { name: "Test User", image: "test.png" },
      create: { lineId: "test-line-id", name: "Test User", image: "test.png" }
    });
    console.log("Success:", user);
  } catch(e) {
    console.error("Error:", e);
  }
}
main().finally(() => prisma.$disconnect());
