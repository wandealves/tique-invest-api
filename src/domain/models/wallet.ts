import _ from "lodash";

import { PurchasedAsset } from "./purchased-asset";
import { CalculatedAsset } from "./calculated-asset";
import { Fees } from "./fees";
import { CurrencyCode } from "./enums";
import { Total, Item } from "../value-objects";

export class Wallet {
  private _id: number;
  private _name: string;
  private _total: number;
  private _totalFees: number;
  private _currencyCode: CurrencyCode;
  private _userId: number;
  private _purchasedAssets: PurchasedAsset[];
  private _calculatedAssets: CalculatedAsset[];

  set name(value: string) {
    this._name = value;
  }

  get name() {
    return this._name;
  }

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

  set currencyCode(value: CurrencyCode) {
    this._currencyCode = value;
  }

  get currencyCode() {
    return this._currencyCode;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get userId() {
    return this._userId;
  }

  set purchasedAssets(value: PurchasedAsset[]) {
    this._purchasedAssets = value;
  }

  get purchasedAssets() {
    return this._purchasedAssets;
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
    this._purchasedAssets = [];
    this._calculatedAssets = [];
  }

  /**
   * Calcular o total de ativos comprados
   *
   * @param purchasedAssets: Lista de ativos
   *
   * @returns number
   */
  public calculateTotalAssets(purchasedAssets: PurchasedAsset[]): number {
    if (_.size(purchasedAssets) === 0) return 0;

    const total = _.reduce(
      purchasedAssets,
      function (sum, item) {
        return sum + item.total;
      },
      0
    );

    return _.toNumber(total.toFixed(2));
  }

  /**
   * Retorna o quantidades, total dos ativos agrupados por código
   *
   * @param purchasedAssets: Lista de ativos
   *
   * @returns Total
   */
  public totalsByGroups(purchasedAssets: PurchasedAsset[]): Total {
    const groups = _.groupBy(purchasedAssets, item => item.assetCode);

    const items: Item[] = [];

    for (const key in groups) {
      const assets = groups[key];

      const totalasset = this.calculateTotalAssets(assets);
      const quantitiesAsset = this.calculateTotalQuantities(assets);

      items.push({
        code: key,
        total: totalasset,
        quantity: quantitiesAsset
      });
    }

    const total = _.reduce(
      items,
      function (sum, item) {
        return sum + item.total;
      },
      0
    );

    const quantity = _.reduce(
      items,
      function (sum, item) {
        return sum + item.quantity;
      },
      0
    );

    return Total.create({
      total: _.toNumber(total.toFixed(2)),
      quantity,
      items
    });
  }

  /**
   * Calcular o quantidades dos ativos
   *
   * @param purchasedAssets: Lista de ativos
   *
   * @returns number
   */
  public calculateTotalQuantities(purchasedAssets: PurchasedAsset[]): number {
    const total = _.reduce(
      purchasedAssets,
      function (sum, item) {
        return sum + item.quantity;
      },
      0
    );

    return _.toNumber(total.toFixed(2));
  }

  /**
   * Calcular o total de taxas
   *
   * @param fees: Lista de taxas
   *
   * @returns number
   */
  public calculateTotalFees(fees: Fees[]): number {
    const total = _.reduce(
      fees,
      function (sum, item) {
        return sum + item.tax;
      },
      0
    );

    return _.toNumber(total.toFixed(2));
  }

  /**
   * Unificar linhas do mesmo ativo
   *
   * @param purchasedAssets: Lista de ativos
   *
   * @returns TicketPurchased[]
   */
  public unifyAssets(purchasedAssets: PurchasedAsset[]): PurchasedAsset[] {
    if (_.size(purchasedAssets) === 0) return [];

    const totalsByGroups = this.totalsByGroups(purchasedAssets);
    const items = _.get(totalsByGroups, "items", []);
    const groupCodes = _.groupBy(items, item => item.code);

    const assets: PurchasedAsset[] = [];

    for (const key in groupCodes) {
      const values = groupCodes[key];

      const item = values[0];

      const asset = _.find(
        purchasedAssets,
        asset => asset.assetCode === item.code
      );

      if (asset) {
        const price = asset.calculateAveragePrice(
          _.get(item, "quantity"),
          _.get(item, "total", 0)
        );
        const purchasedAsset = new PurchasedAsset(
          0,
          price,
          _.get(item, "quantity"),
          asset.assetCode,
          asset.brokerName,
          asset.date,
          asset.transactionType,
          asset.currencyCode
        );

        assets.push(purchasedAsset);
      }
    }

    return assets;
  }

  /**
   * Calcular rateio, porcetageme totais
   *
   * @param purchasedAssets: Lista de ativos
   * @param totalAllAssets: Total dos ativos
   * @param totalFees: Total de taxas
   *
   * @returns TicketPurchased[]
   */
  public calculatePurchasedAsset(
    purchasedAssets: PurchasedAsset[],
    totalAllAssets: number,
    totalFees: number
  ): PurchasedAsset[] {
    if (_.size(purchasedAssets) === 0) return purchasedAssets;

    const list = [];
    for (const asset of purchasedAssets) {
      const apportionmentPercentage = asset.calculateApportionmentPercentage(
        totalAllAssets,
        asset.total
      );

      const apportionmentValue = asset.calculateApportionmentValue(
        totalFees,
        apportionmentPercentage
      );

      const totalWithFees = asset.calculateTotalWithFees(
        asset.total,
        apportionmentValue,
        asset.transactionType
      );

      asset.apportionmentPercentage = apportionmentPercentage;
      asset.apportionmentValue = apportionmentValue;
      asset.totalFees = totalFees;
      asset.totalWithFees = totalWithFees;

      list.push(asset);
    }

    return list;
  }
}
