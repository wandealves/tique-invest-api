/*
  Warnings:

  - Added the required column `transactionType` to the `walletTickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "walletTickets" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "transactionType" "TransactionType" NOT NULL;
