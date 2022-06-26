import { getMonth, getYear } from "date-fns";
import _ from "lodash";

import { TransactionType, CurrencyCode } from "./enums";

export class TicketPurchased {
  private _id: number;
  private _price: number;
  private _quantity: number;
  private _total: number = 0;
  private _totalWithFees: number;
  private _apportionmentValue: number;
  private _apportionmentPercentage: number;
  private _date: Date;
  private _month: number;
  private _year: number;
  private _brokerName: string;
  private _transactionType: TransactionType;
  private _currencyCode: CurrencyCode;

  private _ticketCode: string;
  private _ticketId: number;
  private _walletId: number;

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  set total(value: number) {
    this._total = value;
  }

  get total(): number {
    return this._total;
  }

  set totalWithFees(value: number) {
    this._totalWithFees = value;
  }

  get totalWithFees(): number {
    return this._totalWithFees;
  }

  set apportionmentValue(value: number) {
    this._apportionmentValue = value;
  }

  get apportionmentValue(): number {
    return this._apportionmentValue;
  }

  set apportionmentPercentage(value: number) {
    this._apportionmentPercentage = value;
  }

  get apportionmentPercentage(): number {
    return this._apportionmentPercentage;
  }

  set date(value: Date) {
    this._date = value;
  }

  get date(): Date {
    return this._date;
  }

  set month(value: number) {
    this._month = value;
  }

  get month(): number {
    return this._month;
  }

  set year(value: number) {
    this._year = value;
  }

  get year(): number {
    return this._year;
  }

  set brokerName(value: string) {
    this._brokerName = value;
  }

  get brokerName(): string {
    return this._brokerName;
  }

  set transactionType(value: TransactionType) {
    this._transactionType = value;
  }

  get transactionType(): TransactionType {
    return this._transactionType;
  }

  set currencyCode(value: CurrencyCode) {
    this._currencyCode = value;
  }

  get currencyCode(): CurrencyCode {
    return this._currencyCode;
  }

  get ticketCode(): string {
    return this._ticketCode;
  }

  set ticketCode(value: string) {
    this._ticketCode = value;
  }

  get ticketId(): number {
    return this._ticketId;
  }

  set ticketId(value: number) {
    this._ticketId = value;
  }

  get walletId(): number {
    return this._walletId;
  }

  set walletId(value: number) {
    this._walletId = value;
  }

  constructor(
    id: number,
    price: number,
    quantity: number,
    ticketCode: string,
    brokerName: string,
    date: Date,
    transactionType: TransactionType,
    currencyCode: CurrencyCode
  ) {
    this._id = id;
    this._price = price;
    this._quantity = quantity;
    this._brokerName = brokerName;

    this._date = date;
    this._month = getMonth(new Date(this._date)) + 1;
    this._year = getYear(new Date(this._date));

    this._transactionType = transactionType;
    this._currencyCode = currencyCode;

    this._ticketCode = ticketCode;
    this._ticketId = 0;
    this._walletId = 0;

    this._totalWithFees = 0;
    this._apportionmentValue = 0;
    this._apportionmentPercentage = 0;

    this.calculateTotal();
  }

  /**
   * Cálcular o total comprado
   *
   * @returns this
   */
  public calculateTotal(): TicketPurchased {
    this._total = this.price * this.quantity;

    return this;
  }

  /***
   * Cálcular a porcetagem em relação ao total geral de todos tickets
   *
   * @param totalAllTickets: Total de todos tickets
   *
   * @returns this
   */
  public calculatePercentage(totalAllTickets: number): TicketPurchased {
    if (!totalAllTickets) return this;

    const percentage = this.total / totalAllTickets;

    this._apportionmentPercentage = _.toNumber(percentage.toFixed(4));

    return this;
  }

  /***
   * Cálcular o valor do rateio
   *
   * @param totalAllTickets: Total das taxas
   *
   * @returns this
   */
  public calculateApportionmentValue(totalFees: number): TicketPurchased {
    const apportionmentValue = totalFees * this._apportionmentPercentage;

    this._apportionmentValue = _.toNumber(apportionmentValue.toFixed(2));

    return this;
  }

  /***
   * Cálcular preço média
   *
   * @param totalQuantities: Quantidade total do ticket
   * @param total: Total do ticket
   *
   * @returns this
   */
  public calculateAveragePrice(
    totalQuantities: number,
    total: number
  ): TicketPurchased {
    this._price = totalQuantities > 0 ? total / totalQuantities : 0;

    return this;
  }

  /***
   * Calcular o valor do rateio
   *
   * @param totalAllTickets: Total de todos tickets
   * @param totalFees: Total das taxas
   *
   * @returns this
   */
  public calculateTotalWithFees(
    totalAllTickets: number,
    totalFees: number
  ): TicketPurchased {
    this.calculateTotal();
    this.calculatePercentage(totalAllTickets);
    this.calculateApportionmentValue(totalFees);

    if (this._transactionType === TransactionType.COMPRA)
      this._totalWithFees = this._total + this._apportionmentValue;
    else this._totalWithFees = this._total - this._apportionmentValue;

    return this;
  }
}
