import { PurchasedAssetResponseDto } from "./purchased-asset-response-dto";
import { CalculatedAssetResponseDto } from "./calculated-asset-response-dto";

export interface WalletShowResponseDto {
  id: number;
  name: string;
  total: number;
  totalFees: number;
  currencyCode: string;
  userId: number;
 purchasedAssets: PurchasedAssetResponseDto[];
 // calculatedAssets: CalculatedAssetResponseDto[];
}
