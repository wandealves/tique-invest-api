import { container } from "tsyringe";

import { IInvestmentRepository } from "../../domain/intefaces/repositories";
import { InvestmentRepository } from "../../infra/repositories";

container.register<IInvestmentRepository>(
  "InvestmentRepository",
  InvestmentRepository
);
