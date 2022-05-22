-- CreateTable
CREATE TABLE "fees" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "tax" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "investmentId" INTEGER NOT NULL,

    CONSTRAINT "fees_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fees" ADD CONSTRAINT "fees_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "investments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
