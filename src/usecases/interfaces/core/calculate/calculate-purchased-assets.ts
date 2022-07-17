import { PurchasedAsset } from "../../../../domain/models";
import { CreateWalletError } from "../../../errors";
import { Either } from "../../../../shared";

export interface ICalculatePurchasedAssets {
  execute: (
    purchasedAssets: PurchasedAsset[],
    totalAllAssets: number,
    totalFees: number
  ) => Promise<Either<CreateWalletError, PurchasedAsset[]>>;
}
