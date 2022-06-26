import { container } from "tsyringe";

import {
  IInvestmentRepository,
  IWalletRepository,
  ITicketRepository
} from "../../usecases/interfaces/repositories";
import {
  InvestmentRepository,
  WalletRepository,
  TicketRepository
} from "../../infra/repositories";

container.register<IInvestmentRepository>(
  "InvestmentRepository",
  InvestmentRepository
);

container.register<IWalletRepository>("IWalletRepository", WalletRepository);

container.register<ITicketRepository>("ITicketRepository", TicketRepository);
