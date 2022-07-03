import _ from "lodash";

import { PurchasedAsset } from "../../domain/models";
import {
  transactionTypeToTransactionTypePrisma,
  currencyCodeToCurrencyCodePrisma
} from "../../shared/utils";

export const makeCreatePurchasedAssetRepository = (
  purchasedAssets: PurchasedAsset[]
) => {
  return _.map(purchasedAssets, asset => ({
    price: asset.price,
    quantity: asset.quantity,
    total: asset.total,
    totalWithFees: asset.totalWithFees,
    totalFees: asset.totalFees,
    apportionmentValue: asset.apportionmentValue,
    apportionmentPercentage: asset.apportionmentPercentage,
    date: new Date(asset.date),
    month: asset.month,
    year: asset.year,
    brokerName: asset.brokerName,
    transactionType: transactionTypeToTransactionTypePrisma(
      asset.transactionType
    ),
    currencyCode: currencyCodeToCurrencyCodePrisma(asset.currencyCode),
    assetId: asset.assetId
  }));
};
