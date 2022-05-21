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
    feeValues: number[]
  ): PurchasedAsset[] {
    const fees = new Fees();
    const totalFees = fees.calculateTotalFees(feeValues);

    const totalPurchaseValue = _.reduce(
      purchasedsAsset,
      function (sum, item) {
        return sum + item.total;
      },
      0
    );

    for (const item of purchasedsAsset) {
      const apportionmentPercentage = fees.calculateApportionmentPercentage(
        totalPurchaseValue,
        item.total
      );
      const calculatedRates = fees.calculateFee(
        apportionmentPercentage,
        totalFees
      );

      item.totalWithFees = item.total + calculatedRates;
    }

    return purchasedsAsset;
  }

  public getTotalWithFees(): number {
    return this.totalWithFees;
  }
}
