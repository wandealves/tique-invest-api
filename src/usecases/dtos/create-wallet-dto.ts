import { CreatePurchasedAssetDto } from "./create-purchased-asset-dto";

export interface CreateWalletDto {
  name: string;
  currencyCode: string;
  userId: number;

  createPurchasedAssets: CreatePurchasedAssetDto[];
}
