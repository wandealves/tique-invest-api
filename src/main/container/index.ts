import { container } from "tsyringe";

import { IInvestmentRepository } from "../../usecases/interfaces/repositories";
import { InvestmentRepository } from "../../infra/repositories";

container.register<IInvestmentRepository>(
  "InvestmentRepository",
  InvestmentRepository
);
