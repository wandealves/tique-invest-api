import _ from "lodash";

import { PurchasedAsset } from "./purchased-asset";
import { Fees } from "./fees";
import { CurrencyCode } from "./enums";

export class Wallet {
  private _id: number;
  private _name: string;
  private _total: number;
  private _totalFees: number;
  private _currencyCode: CurrencyCode;
  private _userId: number;

  set total(value: number) {
    this._total = value;
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
  }

  /**
   * Calcular o total comprado
   *
   * @returns
   */
  public calculateTotal(purchasedAssets: PurchasedAsset[]): number {
    return _.reduce(
      purchasedAssets,
      function (sum, item) {
        return sum + item.calculateTotal();
      },
      0
    );
  }

  /**
   * Calcular o qunatidade comprada
   *
   * @returns
   */
  public calculateTotalAmount(purchasedAssets: PurchasedAsset[]): number {
    return _.reduce(
      purchasedAssets,
      function (sum, item) {
        return sum + item.quantity;
      },
      0
    );
  }

  /**
   * Calcular taxas
   *
   * @returns
   */
  public calculateTotalFees(fees: Fees[]): number {
    return _.reduce(
      fees,
      function (sum, item) {
        return sum + item.tax;
      },
      0
    );
  }
}
