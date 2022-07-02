import { PrismaClient } from "@prisma/client";

import { assets } from "./seeds/assets";

const prisma = new PrismaClient();

async function main() {
  for (const ticket of assets) {
    const exist = await prisma.asset.findUnique({
      where: {
        code: ticket.code
      }
    });

    if (!exist)
      await prisma.asset.create({
        data: ticket
      });
  }
}

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
