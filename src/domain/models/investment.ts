import _ from "lodash";

import { PurchasedAsset } from "./purchased-asset";
import { TypeAsset } from "./enums/type-asset";

export class Investment {
  private id: number;
  private total: number;
  private totalFees: number;
  private type: TypeAsset;
  private countryId: number;
  private userId: number;

  constructor(id: number, type: TypeAsset, countryId: number, userId: number) {
    this.id = id;
    this.total = 0;
    this.totalFees = 0;
    this.type = type;
    this.countryId = countryId;
    this.userId = userId;
  }

  set setTotal(total: number) {
    this.total = total;
  }

  set setTotalFees(totalFees: number) {
    this.totalFees = totalFees;
  }

  /**
   * Calcula total sem taxas
   *
   * @param purchasedAssets: Lista de ativos
   */
  public calculateTotalWithoutFees(purchasedAssets: PurchasedAsset[]): number {
    if (_.size(purchasedAssets) === 0) return 0;

    return _.reduce(
      purchasedAssets,
      function (sum, item) {
        return sum + item.getTotal;
      },
      0
    );
  }
  /**
   * Calcula total com taxas
   *
   * @param purchasedAssets: Lista de ativos
   */
  public calculateTotalWithFees(
    purchasedAssets: PurchasedAsset[],
    totalFees: number
  ): number {
    if (_.size(purchasedAssets) === 0) return 0;

    let total = 0;
    const totalAssetsPurchased =
      this.calculateTotalWithoutFees(purchasedAssets);

    for (const item of purchasedAssets) {
      total += item.calculateTotalWithFees(totalAssetsPurchased, totalFees);
    }

    return total;
  }
}
