import { prisma } from "../lib/prisma";

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "Adel",
        email: "adel@xavov.com",
      },
      {
        name: "XAVOV Admin",
        email: "admin@xavov.com",
      },
    ],
  });

  console.log("✅ Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });