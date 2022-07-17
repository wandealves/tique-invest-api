import { container } from "tsyringe";

import {
  IWalletRepository,
  IAssetRepository,
  IUserRepository
} from "../../usecases/interfaces/repositories";
import {
  WalletRepository,
  AssetRepository,
  UserRepository
} from "../../infra/repositories";

container.register<IWalletRepository>("IWalletRepository", WalletRepository);
container.register<IAssetRepository>("IAssetRepository", AssetRepository);
container.register<IUserRepository>("IUserRepository", UserRepository);
