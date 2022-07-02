export interface CreatePurchasedAssetDto {
  assetCode: string;
  price: number;
  quantity: number;
  date: Date;
  brokerName: string;
  transactionType: string;
  currencyCode: string;
}
