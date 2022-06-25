import _ from "lodash";

import { TicketPurchased } from "../../domain/models";
import { CreatePurchasedAssetDto } from "../../usecases/dtos";
import {
  stringToCurrencyCode,
  stringToTransactionType
} from "../../shared/utils";

export const makePurchasedAssets = (
  dtos: CreatePurchasedAssetDto[]
): TicketPurchased[] => {
  return _.map(
    dtos,
    dto =>
      new TicketPurchased(
        0,
        dto.price,
        dto.quantity,
        1,
        dto.brokerName,
        dto.date,
        stringToTransactionType(dto.transactionType),
        stringToCurrencyCode(dto.currencyCode)
      )
  );
};
