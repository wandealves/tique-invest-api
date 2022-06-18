import { getMonth, getYear } from "date-fns";
import _ from "lodash";

import { Fees } from "./fees";
import { TransactionType, CurrencyCode } from "./enums";

export class TicketPurchased {
  private _id: number;
  private _price: number;
  private _quantity: number;
  private _total: number;
  private _totalWithFees: number;
  private _apportionmentValue: number;
  private _apportionmentPercentage: number;
  private _date: Date;
  private _month: number;
  private _year: number;
  private _brokerName: string;
  private _transactionType: TransactionType;
  private _currencyCode: CurrencyCode;

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

    this._ticketId = 0;
    this._walletId = 0;

    this._total = this.calculateTotal();
    this._totalWithFees = 0;
    this._apportionmentValue = 0;
    this._apportionmentPercentage = 0;
  }

  /**
   * Calcula o total comprado
   *
   * @returns
   */
  public calculateTotal(): number {
    return this.price * this.quantity;
  }

  /**
   * Calcula total com taxas
   *
   * @param totalAssetsPurchased: Total de todos ativos comprados
   * @param totalFees: Total de taxas
   */
  public calculateTotalWithFees(
    totalAssetsPurchased: number,
    totalFees: number
  ): number {
    const apportionmentPercentage = this.calculateApportionmentPercentage(
      totalAssetsPurchased,
      this.total
    );

    const calculatedRates = this.calculateRateWithApportionment(
      apportionmentPercentage,
      totalFees
    );

    return this.total + calculatedRates;
  }

  /**
   * Calcula o total de taxas
   *
   * @param fees: Lista de valores de taxas
   * @returns
   */
  public calculateTotalFees(fees: Fees[]): number {
    if (_.size(fees) === 0) return 0;

    const result = _.reduce(
      fees,
      function (sum, fee) {
        return sum + fee.tax;
      },
      0
    );

    return _.toNumber(result.toFixed(2));
  }

  /**
   * Calcula a taxa do ativo com rateio
   *
   * @param apportionmentPercentage : Porcetagem de rateio
   * @param totalFees: Total de taxas
   * @returns
   */
  public calculateRateWithApportionment(
    apportionmentPercentage: number,
    totalFees: number
  ): number {
    if (!totalFees) return 0;

    const result = (apportionmentPercentage / 100) * totalFees;

    return _.toNumber(result.toFixed(2));
  }

  /**
   * Calcula a porcetagem de rateio de um ativo
   *
   * @param totalPurchaseValue = Total do valor de compra sem taxas de todos ativos ativo
   * @param purchasePriceOfAnAssetWithoutFees = Valor da compra de um ativo sem taxas
   * @returns
   */
  public calculateApportionmentPercentage(
    totalPurchaseValue: number,
    purchasePriceOfAnAssetWithoutFees: number
  ): number {
    if (!totalPurchaseValue) return 0;

    const result =
      (purchasePriceOfAnAssetWithoutFees * 100) / totalPurchaseValue;

    return _.toNumber(result.toFixed(2));
  }

  /**
   * Calcular preço médio
   *
   * @param totalWithFees: Valor total da compra com taxas
   * @param totalAmount: Quantidade total de ativos comprados
   * @returns
   */
  public calculateAveragePrice(
    totalWithFees: number,
    totalAmount: number
  ): number {
    if (!totalAmount) return 0;

    const result = totalWithFees / totalAmount;

    return _.toNumber(result.toFixed(2));
  }
}
