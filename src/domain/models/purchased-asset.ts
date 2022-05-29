import { getMonth, getYear } from "date-fns";
import _ from "lodash";
import { threadId } from "worker_threads";

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

  private assetId: number;
  private investmentId: number;

  constructor(
    id: number,
    price: number,
    quantity: number,
    date: Date,
    assetId: number,
    investmentId: number
  ) {
    this.id = id;
    this.price = price;
    this.quantity = quantity;
    this.total = this.calculateTotal();
    this.totalWithFees = 0;
    this.date = date;
    this.month = getMonth(this.date);
    this.year = getYear(this.date);

    this.assetId = assetId;
    this.investmentId = investmentId;
  }

  get getTotal(): number {
    return this.total;
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
        return sum + fee.getTax;
      },
      0
    );

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
