import { Wallet } from "../../domain/models";
import { IInvestmentRepository } from "../../domain/intefaces/repositories";

export class InvestmentRepository implements IInvestmentRepository {
  create(investment: Wallet): Promise<number> {
    return Promise.resolve(10);
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  all(): Promise<Wallet[] | null> {
    throw new Error("Method not implemented.");
  }
  filter(query: any): Promise<Wallet[] | null> {
    throw new Error("Method not implemented.");
  }
  findOne(id: number): Promise<Wallet | null> {
    throw new Error("Method not implemented.");
  }
  find(query: any): Promise<Wallet | null> {
    throw new Error("Method not implemented.");
  }
}
