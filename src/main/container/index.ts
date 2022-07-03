import { container } from "tsyringe";

import {
  IInvestmentRepository,
  IWalletRepository,
  IAssetRepository
} from "../../usecases/interfaces/repositories";
import {
  InvestmentRepository,
  WalletRepository,
  AssetRepository
} from "../../infra/repositories";

container.register<IInvestmentRepository>(
  "InvestmentRepository",
  InvestmentRepository
);

container.register<IWalletRepository>("IWalletRepository", WalletRepository);

container.register<IAssetRepository>("IAssetRepository", AssetRepository);
