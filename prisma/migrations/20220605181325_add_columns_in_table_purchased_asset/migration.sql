-- AlterTable
ALTER TABLE "purchasedAssets" ADD COLUMN     "averagePrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "percentageApportionmentFees" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "totalWithFees" DECIMAL(65,30) NOT NULL DEFAULT 0;
