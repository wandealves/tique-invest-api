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

describe("Dominio -> Cateriras", () => {
  test("Deve calcular o total de tickets comprados", () => {
    const { ticketsPurchased, wallet } = makeSut();

    wallet.calculateTotalTickets(ticketsPurchased);

    expect(wallet.total).toEqual(1515.63);
  });

  test("Deve calcular o quantidades dos tickets", () => {
    const { ticketsPurchased, wallet } = makeSut();

    wallet.calculateTotalQuantities(ticketsPurchased);

    expect(wallet.totalQuantities).toEqual(14);
  });

  test("Deve calcular o total de taxas", () => {
    const { wallet, feeList } = makeSut();

    wallet.calculateTotalFees(feeList);

    expect(wallet.totalFees).toEqual(0.45);
  });

  test("Deve unificar linhas do mesmo tickets", () => {
    const { wallet } = makeSut();

    const ticketsPurchased: TicketPurchased[] = [
      new TicketPurchased(
        0,
        10.2,
        3,
        1,
        "broker_valid",
        new Date(2021, 1, 5),
        TransactionType.COMPRA,
        CurrencyCode.BRL
      ),
      new TicketPurchased(
        0,
        9.8,
        5,
        1,
        "broker_valid",
        new Date(2021, 1, 5),
        TransactionType.COMPRA,
        CurrencyCode.BRL
      ),
      new TicketPurchased(
        0,
        10.45,
        4,
        2,
        "broker_valid",
        new Date(2021, 1, 5),
        TransactionType.COMPRA,
        CurrencyCode.BRL
      ),

      new TicketPurchased(
        0,
        117.69,
        2,
        3,
        "broker_valid",
        new Date(2021, 1, 5),
        TransactionType.COMPRA,
        CurrencyCode.BRL
      )
    ];

    const results = wallet.unifyTickets(ticketsPurchased);
    const resultFind = _.find(
      results,
      result => _.get(result, "ticketId") === 1
    );

    expect(_.get(resultFind, "price")).toEqual(9.95);
  });
});
