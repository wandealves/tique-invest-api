import { Investment } from "../../models";

export interface IInvestmentRepository {
  create(investment: Investment): Promise<number>;
  delete(id: number): Promise<void>;

  all: () => Promise<Investment[] | null>;
  filter: (query: any) => Promise<Investment[] | null>;
  findOne: (id: number) => Promise<Investment | null>;
  find: (query: any) => Promise<Investment | null>;
}
