import _ from "lodash";

import { PurchasedAsset } from "../../domain/models";
import {
  transactionTypeToTransactionTypePrisma,
  currencyCodeToCurrencyCodePrisma
} from "../../shared/utils";

export const makeCreatePurchasedAssets = (
  purchasedAssets: PurchasedAsset[]
) => {
  return _.map(purchasedAssets, asset => ({
    price: asset.price,
    averagePrice: asset.averagePrice,
    quantity: asset.quantity,
    total: asset.total,
    totalWithFees: asset.totalWithFees,
    fees: asset.fees,
    percentageApportionmentFees: asset.percentageApportionmentFees,
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
