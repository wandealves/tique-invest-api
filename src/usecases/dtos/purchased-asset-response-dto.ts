export interface PurchasedAssetResponseDto {
  id: number;
  price: number;
  quantity: number;
  total: number;
  totalWithFees: number;
  totalFees: number;
  apportionmentValue: number;
  apportionmentPercentage: number;
  date: Date;
  month: number;
  year: number;
  brokerName: string;
  transactionType: string;
  currencyCode: string;

  assetCode: string;
  assetId: number;
}
