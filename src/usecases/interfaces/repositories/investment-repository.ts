import { Wallet } from "../../../domain/models";

export interface IInvestmentRepository {
  create(investment: Wallet): Promise<number>;
  delete(id: number): Promise<void>;

  all: () => Promise<Wallet[] | null>;
  filter: (query: any) => Promise<Wallet[] | null>;
  findOne: (id: number) => Promise<Wallet | null>;
  find: (query: any) => Promise<Wallet | null>;
}
