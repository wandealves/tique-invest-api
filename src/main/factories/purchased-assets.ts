import _ from "lodash";

import { PurchasedAsset } from "../../domain/models";
import { CreatePurchasedAssetDto } from "../../usecases/dtos";
import {
  stringToCurrencyCode,
  stringToTransactionType
} from "../../shared/utils";

export const makePurchasedAssets = (
  dtos: CreatePurchasedAssetDto[]
): PurchasedAsset[] => {
  return _.map(
    dtos,
    dto =>
      new PurchasedAsset(
        0,
        dto.price,
        dto.quantity,
        dto.brokerName,
        dto.date,
        stringToTransactionType(dto.transactionType),
        stringToCurrencyCode(dto.currencyCode)
      )
  );
};
