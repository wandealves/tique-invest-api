import _ from "lodash";

import { TicketPurchased } from "../../domain/models";
import { CreateTicketPurchasedDto } from "../../usecases/dtos";
import {
  stringToCurrencyCode,
  stringToTransactionType
} from "../../shared/utils";

export const makeTicketsPurchased = (
  dtos: CreateTicketPurchasedDto[]
): TicketPurchased[] => {
  return _.map(
    dtos,
    dto =>
      new TicketPurchased(
        0,
        dto.price,
        dto.quantity,
        dto.ticketCode,
        dto.brokerName,
        dto.date,
        stringToTransactionType(dto.transactionType),
        stringToCurrencyCode(dto.currencyCode)
      )
  );
};
