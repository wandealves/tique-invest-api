-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('ACAO', 'BDR', 'CDB', 'COE', 'FIIS', 'LCI', 'LCA', 'LC', 'MULTIMERCADO', 'TESOURODIRETO', 'OPCOES');

-- CreateEnum
CREATE TYPE "CurrencyCode" AS ENUM ('BRL', 'EUR', 'USD');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('COMPRA', 'VENDA');

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(300) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "email" VARCHAR(500) NOT NULL,
    "cpf" VARCHAR(20) NOT NULL,
    "avatarUrl" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(500) NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "iconUrl" VARCHAR,
    "type" "AssetType" NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchasedAssets" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalFees" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "apportionmentValue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "apportionmentPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "brokerName" VARCHAR(200) NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "currencyCode" "CurrencyCode" NOT NULL,
    "assetId" INTEGER NOT NULL,
    "walletId" INTEGER,

    CONSTRAINT "purchasedAssets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calculatedAssets" (
    "id" SERIAL NOT NULL,
    "averagePrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "brokerName" VARCHAR(200) NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "currencyCode" "CurrencyCode" NOT NULL,
    "assetId" INTEGER NOT NULL,
    "walletId" INTEGER,

    CONSTRAINT "calculatedAssets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallets" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "currencyCode" "CurrencyCode" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "assets_code_key" ON "assets"("code");

-- CreateIndex
CREATE INDEX "assets_code_idx" ON "assets"("code");

-- AddForeignKey
ALTER TABLE "purchasedAssets" ADD CONSTRAINT "purchasedAssets_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchasedAssets" ADD CONSTRAINT "purchasedAssets_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculatedAssets" ADD CONSTRAINT "calculatedAssets_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculatedAssets" ADD CONSTRAINT "calculatedAssets_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
