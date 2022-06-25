import _ from "lodash";

import { TicketPurchased, Fees, Wallet } from "../../src/domain/models";
import { TransactionType, CurrencyCode } from "../../src/domain/models/enums";

interface SutTypes {
  ticketsPurchased: TicketPurchased[];
  feeList: Fees[];
  wallet: Wallet;
}

const makeSut = (): SutTypes => {
  const wallet = new Wallet(0, "wallet_valid", CurrencyCode.BRL, 1);

  const ticketsPurchased: TicketPurchased[] = [
    new TicketPurchased(
      0,
      114.55,
      3,
      1,
      "broker_valid",
      new Date(2021, 1, 5),
      TransactionType.COMPRA,
      CurrencyCode.BRL
    ),
    new TicketPurchased(
      0,
      178.96,
      5,
      2,
      "broker_valid",
      new Date(2021, 1, 5),
      TransactionType.COMPRA,
      CurrencyCode.BRL
    ),
    new TicketPurchased(
      0,
      10.45,
      4,
      3,
      "broker_valid",
      new Date(2021, 1, 5),
      TransactionType.COMPRA,
      CurrencyCode.BRL
    ),

    new TicketPurchased(
      0,
      117.69,
      2,
      4,
      "broker_valid",
      new Date(2021, 1, 5),
      TransactionType.COMPRA,
      CurrencyCode.BRL
    )
  ];

  const feeList = [new Fees("name_valid", 0.04), new Fees("name_valid", 0.41)];

  return {
    ticketsPurchased,
    feeList,
    wallet
  };
};

describe("Dominio -> Tickets", () => {
  test("Deve calcular total do ticket", () => {
    const { ticketsPurchased } = makeSut();
    const ticketPurchased = ticketsPurchased[0];

    expect(ticketPurchased.total).toEqual(343.65);
  });

  test("Deve calcular a porcetagem em relação ao total geral de todos tickets", () => {
    const { ticketsPurchased, wallet } = makeSut();

    wallet.calculateTotalTickets(ticketsPurchased);

    const ticketPurchased = ticketsPurchased[0];
    ticketPurchased.calculatePercentage(wallet.total);

    expect(ticketPurchased.apportionmentPercentage).toEqual(0.2267);
  });

  test("Deve calcular o valor do rateio", () => {
    const { ticketsPurchased, wallet, feeList } = makeSut();

    wallet.calculateTotalTickets(ticketsPurchased).calculateTotalFees(feeList);

    const ticketPurchased = ticketsPurchased[0];
    ticketPurchased
      .calculatePercentage(wallet.total)
      .calculateApportionmentValue(wallet.totalFees);

    expect(ticketPurchased.apportionmentValue).toEqual(0.1);
  });
});
