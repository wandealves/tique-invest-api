import { CreatePurchasedAssetDto } from "./create-purchased-asset-dto";
import { CreateFeesDto } from "./create-fees-dto";
import { UserDto } from "./user-dto";

export interface CreateWalletDto {
  name: string;
  currencyCode: string;
  user: UserDto;

  assets: CreatePurchasedAssetDto[];
  fees: CreateFeesDto[];
}
