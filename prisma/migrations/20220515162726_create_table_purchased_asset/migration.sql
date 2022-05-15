/*
  Warnings:

  - You are about to drop the column `investmentId` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `assets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "assets" DROP CONSTRAINT "assets_investmentId_fkey";

-- DropForeignKey
ALTER TABLE "assets" DROP CONSTRAINT "assets_userId_fkey";

-- AlterTable
ALTER TABLE "assets" DROP COLUMN "investmentId",
DROP COLUMN "price",
DROP COLUMN "quantity",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "purchased-assets" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "assetId" INTEGER NOT NULL,
    "investmentId" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "purchased-assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "purchased-assets_assetId_userId_idx" ON "purchased-assets"("assetId", "userId");

-- CreateIndex
CREATE INDEX "investments_userId_idx" ON "investments"("userId");

-- AddForeignKey
ALTER TABLE "purchased-assets" ADD CONSTRAINT "purchased-assets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchased-assets" ADD CONSTRAINT "purchased-assets_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchased-assets" ADD CONSTRAINT "purchased-assets_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "investments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
