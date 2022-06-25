import _ from "lodash";

import { TicketPurchased, Fees, Wallet } from "../../src/domain/models";
import { CurrencyCode } from "../../src/domain/models/enums";

import { tickets, unifyTickets } from "../data/mock-data";

interface SutTypes {
  tickets: TicketPurchased[];
  feeList: Fees[];
  wallet: Wallet;
}

const makeSut = (): SutTypes => {
  const wallet = new Wallet(0, "wallet_valid", CurrencyCode.BRL, 1);
  const feeList = [new Fees("name_valid", 0.04), new Fees("name_valid", 0.41)];

  return {
    tickets,
    feeList,
    wallet
  };
};

describe("Dominio -> Cateriras", () => {
  test("Deve calcular o total de tickets comprados", () => {
    const { tickets, wallet } = makeSut();

    wallet.calculateTotalTickets(tickets);

    expect(wallet.total).toEqual(1515.63);
  });

  test("Deve calcular o quantidades dos tickets", () => {
    const { tickets, wallet } = makeSut();

    wallet.calculateTotalQuantities(tickets);

    expect(wallet.totalQuantities).toEqual(14);
  });

  test("Deve calcular o total de taxas", () => {
    const { wallet, feeList } = makeSut();

    wallet.calculateTotalFees(feeList);

    expect(wallet.totalFees).toEqual(0.45);
  });

  test("Deve unificar linhas do mesmo tickets", () => {
    const { wallet } = makeSut();

    const results = wallet.unifyTickets(unifyTickets);
    const resultFind = _.find(
      results,
      result => _.get(result, "ticketCode") === 'ATV01'
    );

    expect(_.get(resultFind, "price")).toEqual(9.95);
  });
});
