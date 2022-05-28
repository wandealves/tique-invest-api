import { inject, injectable } from "tsyringe";

import {
  ICreateInvestment,
  Investment
} from "../protocols/investment-protocols";

import { IInvestmentRepository } from "../../../domain/intefaces/repositories";

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
