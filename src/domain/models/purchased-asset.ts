import { getMonth, getYear } from "date-fns";
import _ from "lodash";

import { TransactionType, CurrencyCode } from "./enums";

export class PurchasedAsset {
  private _id: number;
  private _price: number;
  private _quantity: number;
  private _total: number = 0;
  private _totalFees: number;
  private _apportionmentValue: number;
  private _apportionmentPercentage: number;
  private _date: Date;
  private _month: number;
  private _year: number;
  private _brokerName: string;
  private _transactionType: TransactionType;
  private _currencyCode: CurrencyCode;

  private _assetCode: string;
  private _assetId: number;
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

  set totalFees(value: number) {
    this._totalFees = value;
  }

  get totalFees(): number {
    return this._totalFees;
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

  get assetCode(): string {
    return this._assetCode;
  }

  set assetCode(value: string) {
    this._assetCode = value;
  }

  get assetId(): number {
    return this._assetId;
  }

  set assetId(value: number) {
    this._assetId = value;
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
    assetCode: string,
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

    this._assetCode = assetCode;
    this._assetId = 0;
    this._walletId = 0;

    this._totalFees = 0;
    this._apportionmentValue = 0;
    this._apportionmentPercentage = 0;

    this._total = this.calculateTotal();
  }

  /**
   * Cálcular o total comprado
   *
   * @returns number
   */
  public calculateTotal(): number {
    const total = this.price * this.quantity;

    return _.toNumber(total.toFixed(2));
  }

  /***
   * Cálcular a porcetagem em relação ao total geral de todos ativos
   *
   * @param totalAllAssets: Total de todos ativos
   * @param assetTotal: Total do ticket
   *
   * @returns number
   */
  public calculateApportionmentPercentage(
    totalAllAssets: number,
    assetTotal: number
  ): number {
    if (!totalAllAssets) return 0;

    const percentage = assetTotal / totalAllAssets;

    return _.toNumber(percentage.toFixed(4));
  }

  /***
   * Cálcular o valor do rateio
   *
   * @param totalAllTickets: Total das taxas
   * @param apportionmentPercentage: porcentagem do rateio do ativo
   *
   * @returns number
   */
  public calculateApportionmentValue(
    totalFees: number,
    apportionmentPercentage: number
  ): number {
    const apportionmentValue = totalFees * apportionmentPercentage;

    return _.toNumber(apportionmentValue.toFixed(2));
  }

  /***
   * Cálcular preço média
   *
   * @param totalQuantities: Quantidade total do ticket
   * @param total: Total do ticket
   *
   * @returns number
   */
  public calculateAveragePrice(totalQuantities: number, total: number): number {
    const price = totalQuantities > 0 ? total / totalQuantities : 0;

    return _.toNumber(price.toFixed(2));
  }

  /***
   * Calcular o valor do rateio
   *
   * @param assetTotal: Total o ativo do calculo
   * @param apportionmentValue: Valor o rateio do ativo
   *
   * @returns number
   */
  public calculateTotalWithFees(
    assetTotal: number,
    apportionmentValue: number,
    transactionType: TransactionType
  ): number {
    if (transactionType === TransactionType.COMPRA)
      return assetTotal + apportionmentValue;
    return assetTotal - apportionmentValue;
  }
}
