import { PrismaClient } from "@prisma/client";
import _ from "lodash";

import { User } from "../../domain/models";
import { IUserRepository } from "../../usecases/interfaces/repositories";
import { BcryptAdapter } from "../criptography/bcrypt-adapter";

export class UserRepository implements IUserRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      /*log: [
        {
          emit: "event",
          level: "query"
        },
        {
          emit: "stdout",
          level: "error"
        },
        {
          emit: "stdout",
          level: "info"
        },
        {
          emit: "stdout",
          level: "warn"
        }
      ]*/
    });

    /* this.prisma.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      console.log(
        `Query ${params.model}.${params.action} took ${after - before}ms`
      );
      return result;
    });*/
  }

  async create(entity: User): Promise<number> {
    try {
      const bcryptAdapter = new BcryptAdapter();
      entity.password = await bcryptAdapter.encrypt(entity.password);

      const created = await this.prisma.user.create({
        data: {
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
      const bcryptAdapter = new BcryptAdapter();
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
            user.password,
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
            user.password,
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
          user.password,
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
      const user = await this.prisma.user.findFirst({
        where: query
      });

      if (user)
        return new User(
          user.id,
          user.name,
          user.email,
          user.cpf,
          user.password,
          user.avatarUrl ? user.avatarUrl : ""
        );
      return null;
    } catch (error) {
      return null;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async exists(query: any): Promise<boolean> {
    try {
      const count = await this.prisma.user.count({
        where: query
      });

      return count > 0;
    } catch {
      return false;
    } finally {
      this.prisma.$disconnect();
    }
  }
}
