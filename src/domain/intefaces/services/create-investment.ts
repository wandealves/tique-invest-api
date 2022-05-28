import { Investment } from "../../models/investment";

export interface ICreateInvestment {
  create: (investment: Investment) => Promise<number>;
}
