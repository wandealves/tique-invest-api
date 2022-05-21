/*
  Warnings:

  - Added the required column `assetId` to the `purchasedAssets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchasedAssets" ADD COLUMN     "assetId" INTEGER NOT NULL,
ADD COLUMN     "total" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "purchasedAssets" ADD CONSTRAINT "purchasedAssets_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
