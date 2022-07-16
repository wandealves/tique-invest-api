export interface CalculatedAssetResponseDto {
  id: number;
  averagePrice: number;
  quantity: number;
  total: number;
  brokerName: string;
  transactionType: string;
  currencyCode: string;

  assetId: number;
}
