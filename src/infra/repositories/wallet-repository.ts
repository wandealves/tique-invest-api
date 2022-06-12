import { PrismaClient } from "@prisma/client";
import _ from "lodash";

import { Wallet, PurchasedAsset } from "../../domain/models";
import { IWalletRepository } from "../../usecases/interfaces/repositories";
import { makeCreatePurchasedAssets } from "../../main/factories";
import {
  currencyCodePrismaToCurrencyCode,
  currencyCodeToCurrencyCodePrisma
} from "../../shared/utils";

export class WalletRepository implements IWalletRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(
    entity: Wallet,
    purchasedAssets: PurchasedAsset[]
  ): Promise<number> {
    try {
      const assets = makeCreatePurchasedAssets(purchasedAssets);

      const created = await this.prisma.wallet.create({
        data: {
          name: entity.name,
          total: entity.total,
          totalFees: entity.totalFees,
          currencyCode: currencyCodeToCurrencyCodePrisma(entity.currencyCode),
          userId: entity.userId,
          purchasedAsset: {
            create: assets
          }
        }
      });

      return created.id;
    } catch (error) {
      return 0;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async update(id: number, entity: Wallet): Promise<number> {
    try {
      const update = await this.prisma.wallet.update({
        where: {
          id
        },
        data: {
          name: entity.name,
          total: entity.total,
          totalFees: entity.totalFees,
          currencyCode: currencyCodeToCurrencyCodePrisma(entity.currencyCode),
          userId: entity.userId
        }
      });

      return update.id;
    } catch {
      return 0;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prisma.wallet.delete({
        where: {
          id
        }
      });
    } catch {
    } finally {
      this.prisma.$disconnect();
    }
  }

  async all(): Promise<Wallet[] | null> {
    try {
      const wallets = await this.prisma.wallet.findMany();

      return _.map(
        wallets,
        wallet =>
          new Wallet(
            wallet.id,
            wallet.name,
            currencyCodePrismaToCurrencyCode(wallet.currencyCode),
            wallet.userId
          )
      );
    } catch {
      return null;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async filter(query: any): Promise<Wallet[] | null> {
    try {
      const wallets = await this.prisma.wallet.findMany({
        where: query
      });

      return _.map(
        wallets,
        wallet =>
          new Wallet(
            wallet.id,
            wallet.name,
            currencyCodePrismaToCurrencyCode(wallet.currencyCode),
            wallet.userId
          )
      );
    } catch {
      return null;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async findOne(id: number): Promise<Wallet | null> {
    try {
      const wallet = await this.prisma.wallet.findUnique({
        where: {
          id
        }
      });

      if (wallet)
        return new Wallet(
          wallet.id,
          wallet.name,
          currencyCodePrismaToCurrencyCode(wallet.currencyCode),
          wallet.userId
        );
      return null;
    } catch {
      return null;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async find(query: any): Promise<Wallet | null> {
    try {
      const wallet = await this.prisma.wallet.findUnique({
        where: query
      });

      if (wallet)
        return new Wallet(
          wallet.id,
          wallet.name,
          currencyCodePrismaToCurrencyCode(wallet.currencyCode),
          wallet.userId
        );
      return null;
    } catch {
      return null;
    } finally {
      this.prisma.$disconnect();
    }
  }
}