import { Investment } from "../../domain/models";
import { IInvestmentRepository } from "../../services/interfaces/repository";

export class InvestmentRepository implements IInvestmentRepository {
  create(investment: Investment): Promise<number> {
    return Promise.resolve(10)
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  all(): Promise<Investment[] | null> {
    throw new Error("Method not implemented.");
  }
  filter(query: any): Promise<Investment[] | null> {
    throw new Error("Method not implemented.");
  }
  findOne(id: number): Promise<Investment | null> {
    throw new Error("Method not implemented.");
  }
  find(query: any): Promise<Investment | null> {
    throw new Error("Method not implemented.");
  }
}
