import { CreatePurchasedAssetDto, FeesDto } from "../../shared/dtos";

export interface CreateInvestmentDto {
  id: number;
  type: string;
  countryId: number;
  userId: number;

  fees: FeesDto[];
  assets: CreatePurchasedAssetDto[];
}
