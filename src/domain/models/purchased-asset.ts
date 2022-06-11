import { getMonth, getYear } from "date-fns";
import _ from "lodash";

import { Asset } from "./asset";
import { Fees } from "./fees";
import { TransactionType, CurrencyCode } from "./enums";

export class PurchasedAsset {
  private _id: number;
  private _price: number;
  private _averagePrice: number;
  private _quantity: number;
  private _total: number;
  private _totalWithFees: number;
  private _fees: number;
  private _percentageApportionmentFees: number;
  private _date: Date;
  private _month: number;
  private _year: number;
  private _brokerName: string;
  private _transactionType: TransactionType;
  private _currencyCode: CurrencyCode;

  private _assetId: number;
  private _walletId: number;

  get price(): number {
    return this._price;
  }

  set averagePrice(value: number) {
    this._averagePrice = value;
  }

  get averagePrice(): number {
    return this._averagePrice;
  }

  get quantity(): number {
    return this._quantity;
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

  set percentageApportionmentFees(value: number) {
    this._percentageApportionmentFees = value;
  }

  get percentageApportionmentFees(): number {
    return this._percentageApportionmentFees;
  }

  set assetId(value: number) {
    this._assetId = value;
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
    this._averagePrice = 0;
    this._quantity = quantity;
    this._brokerName = brokerName;

    this._date = date;
    this._month = getMonth(new Date(this._date)) + 1;
    this._year = getYear(new Date(this._date));

    this._transactionType = transactionType;
    this._currencyCode = currencyCode;

    this._assetId = 0;
    this._walletId = 0;

    this._total = this.calculateTotal();
    this._totalWithFees = 0;
    this._fees = 0;
    this._percentageApportionmentFees = 0;
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
   * @param totalAssetsPurchased: Total ativos comprados
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
    return totalWithFees / totalAmount;
  }
}
