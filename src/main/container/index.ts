import { container } from "tsyringe";

import {
  IInvestmentRepository,
  IWalletRepository,
  IAssetRepository,
  IUserRepository,
} from "../../usecases/interfaces/repositories";
import {
  InvestmentRepository,
  WalletRepository,
  AssetRepository,
  UserRepository
} from "../../infra/repositories";

container.register<IInvestmentRepository>(
  "InvestmentRepository",
  InvestmentRepository
);

container.register<IWalletRepository>("IWalletRepository", WalletRepository);

container.register<IAssetRepository>("IAssetRepository", AssetRepository);

container.register<IUserRepository>("IUserRepository", UserRepository);
