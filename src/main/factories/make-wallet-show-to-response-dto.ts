import _ from "lodash";

import { Wallet } from "../../domain/models";
import { WalletShowResponseDto } from "../../usecases/dtos";
import {
  currencyCodeToString,
  transactionTypeToString
} from "../../shared/utils";

export const makeWalletShowToResponseDto = (
  entity: Wallet
): WalletShowResponseDto => {
  return {
    id: entity.id,
    name: entity.name,
    total: entity.total,
    totalFees: entity.totalFees,
    currencyCode: currencyCodeToString(entity.currencyCode),
    userId: entity.userId,
    purchasedAssets: _.map(entity.purchasedAssets, asset => ({
      id: asset.id,
      price: asset.price,
      quantity: asset.quantity,
      total: asset.total,
      totalWithFees: asset.totalWithFees,
      totalFees: asset.totalFees,
      apportionmentValue: asset.apportionmentValue,
      apportionmentPercentage: asset.apportionmentPercentage,
      date: asset.date,
      month: asset.month,
      year: asset.year,
      brokerName: asset.brokerName,
      transactionType: transactionTypeToString(asset.transactionType),
      currencyCode: currencyCodeToString(asset.currencyCode),
      assetCode: asset.assetCode,
      assetId: asset.assetId
    }))
  };
};
