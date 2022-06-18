-- CreateEnum
CREATE TYPE "TypeTicket" AS ENUM ('ACAO', 'BDR', 'CDB', 'COE', 'FIIS', 'LCI', 'LCA', 'LC', 'MULTIMERCADO', 'TESOURODIRETO', 'OPCOES');

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
CREATE TABLE "tickets" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(500) NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "iconUrl" VARCHAR,
    "type" "TypeTicket" NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticketsPurchased" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalWithFees" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "apportionmentValue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "apportionmentPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "brokerName" VARCHAR(200) NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "currencyCode" "CurrencyCode" NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "walletId" INTEGER,

    CONSTRAINT "ticketsPurchased_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "walletTickets" (
    "id" SERIAL NOT NULL,
    "averagePrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "brokerName" VARCHAR(200) NOT NULL,
    "currencyCode" "CurrencyCode" NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "walletId" INTEGER,

    CONSTRAINT "walletTickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallets" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalFees" DECIMAL(65,30) NOT NULL DEFAULT 0,
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
CREATE UNIQUE INDEX "tickets_code_key" ON "tickets"("code");

-- CreateIndex
CREATE INDEX "tickets_code_idx" ON "tickets"("code");

-- AddForeignKey
ALTER TABLE "ticketsPurchased" ADD CONSTRAINT "ticketsPurchased_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketsPurchased" ADD CONSTRAINT "ticketsPurchased_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "walletTickets" ADD CONSTRAINT "walletTickets_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "walletTickets" ADD CONSTRAINT "walletTickets_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
