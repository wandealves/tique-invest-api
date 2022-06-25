import { PrismaClient } from "@prisma/client";
import _ from "lodash";

import { Ticket } from "../../domain/models";
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

  async create(entity: Ticket): Promise<number> {
    try {
      const create = await this.prisma.ticket.create({
        data: {
          name: entity.name,
          code: entity.code,
          iconUrl: entity.iconUrl,
          type: typeAssetToPrismaTypeAsset(entity.typeAsset)
        }
      });

      return create.id;
    } catch {
      return 0;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async update(id: number, entity: Ticket): Promise<number> {
    try {
      const update = await this.prisma.ticket.update({
        where: {
          id
        },
        data: {
          name: entity.name,
          code: entity.code,
          iconUrl: entity.iconUrl,
          type: typeAssetToPrismaTypeAsset(entity.typeAsset)
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
      await this.prisma.ticket.delete({
        where: {
          id
        }
      });
    } catch {
    } finally {
      this.prisma.$disconnect();
    }
  }

  async all(): Promise<Ticket[] | null> {
    try {
      const assets = await this.prisma.ticket.findMany();

      return _.map(
        assets,
        asset =>
          new Ticket(
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

  async filter(query: any): Promise<Ticket[] | null> {
    try {
      const assets = await this.prisma.ticket.findMany({
        where: query
      });

      return _.map(
        assets,
        asset =>
          new Ticket(
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

  async findOne(id: number): Promise<Ticket | null> {
    try {
      const asset = await this.prisma.ticket.findUnique({
        where: {
          id
        }
      });

      if (asset)
        return new Ticket(
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

  async findCode(code: string): Promise<Ticket | null> {
    try {
      const asset = await this.prisma.ticket.findUnique({
        where: {
          code
        }
      });

      if (asset)
        return new Ticket(
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

  async find(query: any): Promise<Ticket | null> {
    try {
      const asset = await this.prisma.ticket.findUnique({
        where: query
      });

      if (asset)
        return new Ticket(
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
