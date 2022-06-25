import _, { conformsTo } from "lodash";

import { TicketPurchased } from "./ticket-purchased";
import { WalletTicket } from "./wallet-ticket";
import { Fees } from "./fees";
import { CurrencyCode } from "./enums";

export class Wallet {
  private _id: number;
  private _name: string;
  private _total: number;
  private _totalQuantities: number = 0;
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

  get totalQuantities() {
    return this._totalQuantities;
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
  public calculateTotalTickets(ticketsPurchased: TicketPurchased[]): Wallet {
    this._total = _.reduce(
      ticketsPurchased,
      function (sum, item) {
        return sum + item.total;
      },
      0
    );

    return this;
  }

  /**
   * Calcular o quantidades dos tickets
   *
   * @returns
   */
  public calculateTotalQuantities(ticketsPurchased: TicketPurchased[]): Wallet {
    this._totalQuantities = _.reduce(
      ticketsPurchased,
      function (sum, item) {
        return sum + item.quantity;
      },
      0
    );

    return this;
  }

  /**
   * Calcular o total de taxas
   *
   * @param ticketsPurchased: Lista de taxas
   *
   * @returns number
   */
  public calculateTotalFees(fees: Fees[]): Wallet {
    const total = _.reduce(
      fees,
      function (sum, item) {
        return sum + item.tax;
      },
      0
    );

    this._totalFees = _.toNumber(total.toFixed(2));

    return this;
  }

  public calculateAveragePrice(): number {
    return this._totalQuantities > 0 ? this._total / this._totalQuantities : 0;
  }

  /**
   * Unificar linhas do mesmo tickets
   *
   * @param ticketsPurchased: Lista de tickets
   *
   * @returns TicketPurchased[]
   */
  public unifyTickets(ticketsPurchased: TicketPurchased[]): TicketPurchased[] {
    if (_.size(ticketsPurchased) === 0) return ticketsPurchased;

    const groups = _.groupBy(ticketsPurchased, ticket => ticket.ticketId);

    const tickets: TicketPurchased[] = [];

    for (const key in groups) {
      const items = groups[key];

      const price = this.calculateTotalQuantities(items)
        .calculateTotalTickets(items)
        .calculateAveragePrice();

      const item = items[0];

      const ticketPurchased = new TicketPurchased(
        0,
        price,
        this._totalQuantities,
        item.ticketId,
        item.brokerName,
        item.date,
        item.transactionType,
        item.currencyCode
      );

      tickets.push(ticketPurchased);
    }

    return tickets;
  }
}
