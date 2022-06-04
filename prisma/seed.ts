import { PrismaClient } from "@prisma/client";

import { assets } from "./seeds/assets";

const prisma = new PrismaClient();

async function main() {
  for (const asset of assets) {
    const exist = await prisma.asset.findUnique({
      where: {
        code: asset.code
      }
    });

    if (!exist)
      await prisma.asset.create({
        data: asset
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
