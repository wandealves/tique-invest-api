import _ from "lodash";

import { TicketPurchased } from "./ticket-purchased";
import { WalletTicket } from "./wallet-ticket";
import { Fees } from "./fees";
import { CurrencyCode } from "./enums";

export class Wallet {
  private _id: number;
  private _name: string;
  private _total: number;
  private _totalFees: number;
  private _currencyCode: CurrencyCode;
  private _userId: number;
  private _ticketsPurchased: TicketPurchased[];
  private _walletTickets: WalletTicket[];

  set name(value: string) {
    this._name = value;
  }

  get name() {
    return this._name;
  }

  set total(value: number) {
    this._total = value;
  }

  get total() {
    return this._total;
  }

  set totalFees(value: number) {
    this._totalFees = value;
  }

  get totalFees() {
    return this._totalFees;
  }

  set currencyCode(value: CurrencyCode) {
    this._currencyCode = value;
  }

  get currencyCode() {
    return this._currencyCode;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get userId() {
    return this._userId;
  }

  set ticketsPurchased(value: TicketPurchased[]) {
    this._ticketsPurchased = value;
  }

  get ticketsPurchased() {
    return this._ticketsPurchased;
  }

  constructor(
    id: number,
    name: string,
    currencyCode: CurrencyCode,
    userId: number
  ) {
    this._id = id;
    this._name = name;
    this._total = 0;
    this._totalFees = 0;
    this._currencyCode = currencyCode;
    this._userId = userId;
    this._ticketsPurchased = [];
    this._walletTickets = [];
  }

  /**
   * Calcular o total de tickets comprados
   *
   * @param ticketsPurchased: Lista de tickets
   *
   * @returns number
   */
  public calculateTotalTickets(ticketsPurchased: TicketPurchased[]): number {
    const total = _.reduce(
      ticketsPurchased,
      function (sum, item) {
        return sum + item.total;
      },
      0
    );

    return total;
  }

  /**
   * Calcular o quantidades dos tickets
   *
   * @returns
   */
  public calculateTotalAmount(ticketsPurchased: TicketPurchased[]): number {
    return _.reduce(
      ticketsPurchased,
      function (sum, item) {
        return sum + item.quantity;
      },
      0
    );
  }

  /**
   * Calcular o total de taxas
   *
   * @param ticketsPurchased: Lista de taxas
   *
   * @returns number
   */
  public calculateTotalFees(fees: Fees[]): number {
    const total = _.reduce(
      fees,
      function (sum, item) {
        return sum + item.tax;
      },
      0
    );

    return _.toNumber(total.toFixed(2));
  }
}
