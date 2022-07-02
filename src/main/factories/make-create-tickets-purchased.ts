import _ from "lodash";

import { PurchasedAsset } from "../../domain/models";
import {
  transactionTypeToTransactionTypePrisma,
  currencyCodeToCurrencyCodePrisma
} from "../../shared/utils";

export const makeCreateTicketsPurchased = (
  ticketsPurchased: PurchasedAsset[]
) => {
  return _.map(ticketsPurchased, ticket => ({
    price: ticket.price,
    quantity: ticket.quantity,
    total: ticket.total,
    totalFees: ticket.totalFees,
    apportionmentValue: ticket.apportionmentValue,
    apportionmentPercentage: ticket.apportionmentPercentage,
    date: new Date(ticket.date),
    month: ticket.month,
    year: ticket.year,
    brokerName: ticket.brokerName,
    transactionType: transactionTypeToTransactionTypePrisma(
      ticket.transactionType
    ),
    currencyCode: currencyCodeToCurrencyCodePrisma(ticket.currencyCode),
    ticketId: ticket.ticketId
  }));
};
