import { PrismaClient } from "@prisma/client";
import _ from "lodash";

import { Asset } from "../../domain/models";
import { IAssetRepository } from "../../usecases/interfaces/repositories";
import {
  typeAssetToPrismaTypeAsset,
  typeAssetPrismaToTypeAsset
} from "../../shared/utils";

export class AssetRepository implements IAssetRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: Asset): Promise<number> {
    try {
      const create = await this.prisma.asset.create({
        data: {
          name: entity.name,
          code: entity.code,
          iconUrl: entity.iconUrl,
          type: typeAssetToPrismaTypeAsset(entity.assetType)
        }
      });

      return create.id;
    } catch {
      return 0;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async update(id: number, entity: Asset): Promise<number> {
    try {
      const update = await this.prisma.asset.update({
        where: {
          id
        },
        data: {
          name: entity.name,
          code: entity.code,
          iconUrl: entity.iconUrl,
          type: typeAssetToPrismaTypeAsset(entity.assetType)
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
      await this.prisma.asset.delete({
        where: {
          id
        }
      });
    } catch {
    } finally {
      this.prisma.$disconnect();
    }
  }

  async all(): Promise<Asset[] | null> {
    try {
      const assets = await this.prisma.asset.findMany();

      return _.map(
        assets,
        asset =>
          new Asset(
            asset.id,
            asset.name,
            asset.code,
            asset.iconUrl ? asset.iconUrl : "",
            typeAssetPrismaToTypeAsset(asset.type)
          )
      );
    } catch {
      return null;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async filter(query: any): Promise<Asset[] | null> {
    try {
      const assets = await this.prisma.asset.findMany({
        where: query
      });

      return _.map(
        assets,
        asset =>
          new Asset(
            asset.id,
            asset.name,
            asset.code,
            asset.iconUrl ? asset.iconUrl : "",
            typeAssetPrismaToTypeAsset(asset.type)
          )
      );
    } catch (error) {
      return null;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async findOne(id: number): Promise<Asset | null> {
    try {
      const asset = await this.prisma.asset.findUnique({
        where: {
          id
        }
      });

      if (asset)
        return new Asset(
          asset.id,
          asset.name,
          asset.code,
          asset.iconUrl ? asset.iconUrl : "",
          typeAssetPrismaToTypeAsset(asset.type)
        );
      return null;
    } catch {
      return null;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async findCode(code: string): Promise<Asset | null> {
    try {
      const asset = await this.prisma.asset.findUnique({
        where: {
          code
        }
      });

      if (asset)
        return new Asset(
          asset.id,
          asset.name,
          asset.code,
          asset.iconUrl ? asset.iconUrl : "",
          typeAssetPrismaToTypeAsset(asset.type)
        );
      return null;
    } catch {
      return null;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async find(query: any): Promise<Asset | null> {
    try {
      const asset = await this.prisma.asset.findUnique({
        where: query
      });

      if (asset)
        return new Asset(
          asset.id,
          asset.name,
          asset.code,
          asset.iconUrl ? asset.iconUrl : "",
          typeAssetPrismaToTypeAsset(asset.type)
        );
      return null;
    } catch {
      return null;
    } finally {
      this.prisma.$disconnect();
    }
  }
}
