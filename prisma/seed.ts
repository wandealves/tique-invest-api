import { PrismaClient } from "@prisma/client";

import { tickets } from "./seeds/tickets";

const prisma = new PrismaClient();

async function main() {
  for (const ticket of tickets) {
    const exist = await prisma.ticket.findUnique({
      where: {
        code: ticket.code
      }
    });

    if (!exist)
      await prisma.ticket.create({
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
