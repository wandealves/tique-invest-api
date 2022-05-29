import { container } from "tsyringe";

import { CreateInvestmentDto } from "../../shared/dtos";
import { CreateInvestment } from "../../services/usecases/investment";
import { createInvestmentDtoToInvestmentModel } from "../../shared/mapper";

import { ok } from "../helpers";
import { HttpResponse } from "../protocols";

export class InvestmentController {
  constructor() {}

  public async post(request: CreateInvestmentDto): Promise<HttpResponse> {
    const createInvestment = container.resolve(CreateInvestment);
    const investment = createInvestmentDtoToInvestmentModel(request);
    const result = await createInvestment.create(investment);

    return ok({ value: result });
  }

  public async getAll(): Promise<HttpResponse> {
    return ok({ id: 9, name: "OPA0889" });
  }
}
