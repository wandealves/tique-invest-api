import { CreatePurchasedAssetDto } from "./create-purchased-asset-dto";
import { CreateFeesDto } from "./create-fees-dto";

export interface CreateWalletDto {
  name: string;
  currencyCode: string;
  userId: number;

  assets: CreatePurchasedAssetDto[];
  fees: CreateFeesDto[];
}
