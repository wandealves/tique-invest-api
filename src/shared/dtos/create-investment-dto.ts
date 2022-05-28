import { CreatePurchasedAssetDto } from "../../shared/dtos";

export interface CreateInvestmentDto {
  id:number
  type: string;
  countryId: number;
  userId: number;

  assets: CreatePurchasedAssetDto[];
}
