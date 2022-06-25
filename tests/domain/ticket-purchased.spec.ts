import _ from "lodash";

import { TicketPurchased, Fees, Wallet } from "../../src/domain/models";
import { CurrencyCode } from "../../src/domain/models/enums";

import { tickets } from "../data/mock-data";

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

describe("Dominio -> Tickets", () => {
  test("Deve calcular total do ticket", () => {
    const { tickets } = makeSut();
    const ticketPurchased = tickets[0];

    expect(ticketPurchased.total).toEqual(343.65);
  });

  test("Deve calcular a porcetagem em relação ao total geral de todos tickets", () => {
    const { tickets, wallet } = makeSut();

    wallet.calculateTotalTickets(tickets);

    const ticketPurchased = tickets[0];
    ticketPurchased.calculatePercentage(wallet.total);

    expect(ticketPurchased.apportionmentPercentage).toEqual(0.2267);
  });

  test("Deve calcular o valor do rateio", () => {
    const { tickets, wallet, feeList } = makeSut();

    wallet.calculateTotalTickets(tickets).calculateTotalFees(feeList);

    const ticketPurchased = tickets[0];
    ticketPurchased
      .calculatePercentage(wallet.total)
      .calculateApportionmentValue(wallet.totalFees);

    expect(ticketPurchased.apportionmentValue).toEqual(0.1);
  });
});
