import { getMonth, getYear } from "date-fns";
import _ from "lodash";

import { Asset } from "./asset";
import { Investment } from "./investment";
import { Fees } from "./fees";

export class PurchasedAsset {
  private id: number;
  private price: number;
  private quantity: number;
  private total: number;
  private totalWithFees: number;
  private date: Date;
  private month: number;
  private year: number;

  private readonly asset: Asset;
  private readonly investment: Investment;

  constructor(
    id: number,
    price: number,
    quantity: number,
    date: Date,
    asset: Asset,
    investment: Investment
  ) {
    this.id = id;
    this.price = price;
    this.quantity = quantity;
    this.total = this.calculateTotal();
    this.totalWithFees = 0;
    this.date = date;
    this.month = getMonth(this.date);
    this.year = getYear(this.date);

    this.asset = asset;
    this.investment = investment;
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
   * @param purchasedsAsset: Lista de ativos comprados
   * @param feeValues: Total de taxas
   */
  public calculatePurchaseValueWithFees(
    purchasedsAsset: PurchasedAsset[],
    totalFees: number
  ): PurchasedAsset[] {
    const totalPurchaseValue = _.reduce(
      purchasedsAsset,
      function (sum, item) {
        return sum + item.total;
      },
      0
    );

    for (const item of purchasedsAsset) {
      const apportionmentPercentage = this.calculateApportionmentPercentage(
        totalPurchaseValue,
        item.total
      );
      const calculatedRates = this.calculateFee(
        apportionmentPercentage,
        totalFees
      );

      item.totalWithFees = item.total + calculatedRates;
    }

    return purchasedsAsset;
  }

  /**
   * Calcula a taxa do ativo com rateio
   *
   * @param apportionmentPercentage : Porcetagem de rateio
   * @param totalFees: Total de taxas
   * @returns
   */
  public calculateFee(
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
        return sum + fee.getTax();
      },
      0
    );

    return _.toNumber(result.toFixed(2));
  }

  public getTotalWithFees(): number {
    return this.totalWithFees;
  }
}
