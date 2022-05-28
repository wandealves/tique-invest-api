import { inject, injectable } from "tsyringe";

import {
  ICreateInvestment,
  Investment
} from "../protocols/investment-protocols";

import { IInvestmentRepository } from "../../interfaces/repository";

@injectable()
export class CreateInvestment implements ICreateInvestment {
  constructor(
    @inject("InvestmentRepository")
    private investmentRepository: IInvestmentRepository
  ) {}

  async create(investment: Investment): Promise<number> {
    const result = await this.investmentRepository.create(investment);
    return result;
  }
}
