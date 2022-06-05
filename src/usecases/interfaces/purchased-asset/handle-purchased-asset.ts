import { PurchasedAsset } from "../../../domain/models";
import { CreatePurchasedAssetDto } from "../../dtos";
import { CreateWalletError } from "../../errors";
import { Either, left } from "../../../shared";

export interface HandlePurchasedAssetData {
  walletId: number;
  totalAssetsPurchased: number;
  totalAmount: number;
  totalFees: number;
  dtos: CreatePurchasedAssetDto[];
}

export interface IHandlePurchasedAsset {
  execute: (
    data: HandlePurchasedAssetData
  ) => Promise<Either<CreateWalletError, PurchasedAsset[]>>;
}
