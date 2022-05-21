-- CreateEnum
CREATE TYPE "TypeInvestment" AS ENUM ('ACAO', 'BDR', 'CDB', 'COE', 'FIIS', 'LCI', 'LCA', 'LC', 'MULTIMERCADO', 'TESOURODIRETO', 'OPCOES');

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
    "avatarUrl" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "iconUrl" VARCHAR,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchasedAssets" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "investmentId" INTEGER,

    CONSTRAINT "purchasedAssets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investments" (
    "id" SERIAL NOT NULL,
    "total" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "type" "TypeInvestment" NOT NULL,
    "countryId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "assets_code_key" ON "assets"("code");

-- CreateIndex
CREATE INDEX "assets_code_idx" ON "assets"("code");

-- CreateIndex
CREATE INDEX "investments_userId_idx" ON "investments"("userId");

-- AddForeignKey
ALTER TABLE "purchasedAssets" ADD CONSTRAINT "purchasedAssets_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "investments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
