export interface CreatePurchasedAssetDto {
  codeAsset: string;
  price: number;
  quantity: number;
  date: Date;
  brokerName: string;
  transactionType: string;
  currencyCode: string;
}
