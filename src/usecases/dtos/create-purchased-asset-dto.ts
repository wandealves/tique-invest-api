export interface CreatePurchasedAssetDto {
  codeAsset: string;
  price: number;
  quantity: number;
  total: number;
  fees: number;
  date: Date;
  brokerName: string;
  transactionType: string;
  currencyCode: string;
}
