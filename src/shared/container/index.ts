import { container } from "tsyringe";

import { IInvestmentRepository } from "../../services/interfaces/repository";
import { InvestmentRepository } from "../../infra/repositories";

container.register<IInvestmentRepository>(
  "InvestmentRepository",
  InvestmentRepository
);
