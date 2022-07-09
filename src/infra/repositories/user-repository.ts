import { PrismaClient } from "@prisma/client";
import _ from "lodash";

import { User } from "../../domain/models";
import { IUserRepository } from "../../usecases/interfaces/repositories";
import { BcryptAdapter } from "../criptography/bcrypt-adapter";

export class UserRepository implements IUserRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(entity: User): Promise<number> {
    try {
      const bcryptAdapter = new BcryptAdapter(20);
      entity.password = await bcryptAdapter.encrypt(entity.password);

      const created = await this.prisma.user.create({
        data: {
          id: 0,
          name: entity.name,
          email: entity.email,
          cpf: entity.cpf,
          password: entity.password,
          avatarUrl: entity.avatarUrl
        }
      });

      return created.id;
    } catch (error) {
      return 0;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async update(id: number, entity: User): Promise<number> {
    try {
      const bcryptAdapter = new BcryptAdapter(20);
      entity.password = await bcryptAdapter.encrypt(entity.password);

      const update = await this.prisma.user.update({
        where: {
          id
        },
        data: {
          name: entity.name,
          email: entity.email,
          cpf: entity.cpf,
          password: entity.password,
          avatarUrl: entity.avatarUrl
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
      await this.prisma.user.delete({
        where: {
          id
        }
      });
    } catch {
    } finally {
      this.prisma.$disconnect();
    }
  }

  async all(): Promise<User[] | null> {
    try {
      const users = await this.prisma.user.findMany();

      return _.map(
        users,
        user =>
          new User(
            user.id,
            user.name,
            user.email,
            user.cpf,
            "",
            user.avatarUrl ? user.avatarUrl : ""
          )
      );
    } catch {
      return null;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async filter(query: any): Promise<User[] | null> {
    try {
      const users = await this.prisma.user.findMany({
        where: query
      });

      return _.map(
        users,
        user =>
          new User(
            user.id,
            user.name,
            user.email,
            user.cpf,
            "",
            user.avatarUrl ? user.avatarUrl : ""
          )
      );
    } catch {
      return null;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id
        }
      });

      if (user)
        return new User(
          user.id,
          user.name,
          user.email,
          user.cpf,
          "",
          user.avatarUrl ? user.avatarUrl : ""
        );
      return null;
    } catch {
      return null;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async find(query: any): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: query
      });

      if (user)
        return new User(
          user.id,
          user.name,
          user.email,
          user.cpf,
          "",
          user.avatarUrl ? user.avatarUrl : ""
        );
      return null;
    } catch {
      return null;
    } finally {
      this.prisma.$disconnect();
    }
  }
}
