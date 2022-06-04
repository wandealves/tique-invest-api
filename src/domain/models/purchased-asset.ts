import { getMonth, getYear } from "date-fns";
import _ from "lodash";

import { Fees } from "./fees";
import { TransactionType, CurrencyCode } from "./enums";

export class PurchasedAsset {
  private readonly _id: number;
  private readonly _price: number;
  private readonly _quantity: number;
  private readonly _total: number;
  private readonly _fees: number;
  private readonly _date: Date;
  private readonly _month: number;
  private readonly _year: number;
  private readonly _brokerName: string;
  private readonly _transactionType: TransactionType;
  private readonly _currencyCode: CurrencyCode;

  private readonly _assetId: number;
  private readonly _walletId: number;

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  get total(): number {
    return this._total;
  }

  constructor(
    id: number,
    price: number,
    quantity: number,
    brokerName: string,
    date: Date,
    transactionType: TransactionType,
    currencyCode: CurrencyCode,
    walletId: number,
    assetId: number
  ) {
    this._id = id;
    this._price = price;
    this._quantity = quantity;
    this._brokerName = brokerName;

    this._date = date;
    this._month = getMonth(this._date);
    this._year = getYear(this._date);

    this._transactionType = transactionType;
    this._currencyCode = currencyCode;

    this._assetId = assetId;
    this._walletId = walletId;

    this._total = this.calculateTotal();
    this._fees = 0;
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
