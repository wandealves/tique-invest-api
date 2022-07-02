import _, { conformsTo } from "lodash";

import { PurchasedAsset } from "./purchased-asset";
import { CalculatedAsset } from "./calculated-asset";
import { Fees } from "./fees";
import { CurrencyCode } from "./enums";
import { Total, Item } from "../value-objects";

export class Wallet {
  private _id: number;
  private _name: string;
  private _total: number;
  private _totalQuantities: number = 0;
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

  set totalQuantities(value: number) {
    this._totalQuantities = value;
  }

  get totalQuantities() {
    return this._totalQuantities;
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
   * Calcular o total de tickets comprados
   *
   * @param ticketsPurchased: Lista de tickets
   *
   * @returns number
   */
  public calculateTotalAssets(purchasedAssets: PurchasedAsset[]): number {
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
   * Retorna o quantidades, totais do tickets
   *
   * @returns
   */
  public calculateTotalsByGroups(ticketsPurchased: PurchasedAsset[]): Total {
    const groups = _.groupBy(ticketsPurchased, ticket => ticket.assetCode);

    const items: Item[] = [];

    for (const key in groups) {
      const tickets = groups[key];

      const totalTicket = this.calculateTotalAssets(tickets);
      const quantitiesTicket = this.calculateTotalQuantities(tickets);

      items.push({
        code: key,
        total: totalTicket,
        quantity: quantitiesTicket
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
   * Calcular o quantidades dos tickets
   *
   * @returns
   */
  public calculateTotalQuantities(ticketsPurchased: PurchasedAsset[]): number {
    const total = _.reduce(
      ticketsPurchased,
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
   * @param ticketsPurchased: Lista de taxas
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
   * Unificar linhas do mesmo tickets
   *
   * @param ticketsPurchased: Lista de tickets
   *
   * @returns TicketPurchased[]
   */
  public unifyTickets(
    ticketsPurchased: PurchasedAsset[],
    fees: Fees[]
  ): PurchasedAsset[] {
    if (_.size(ticketsPurchased) === 0) return ticketsPurchased;

    const totalsByGroups = this.calculateTotalsByGroups(ticketsPurchased);
    const totalTicketsGroups = _.get(totalsByGroups, "items", []);

    this.total = _.get(totalsByGroups, "total", 0);
    this.totalQuantities = _.get(totalsByGroups, "quantity", 0);
    this._totalFees = this.calculateTotalFees(fees);

    const groups = _.groupBy(ticketsPurchased, ticket => ticket.assetCode);

    const tickets: PurchasedAsset[] = [];

    for (const key in groups) {
      const items = groups[key];

      const item = items[0];

      const totalTicketGroupFind = _.find(
        totalTicketsGroups,
        group => _.get(group, "code") === key
      );
      const price = item.calculateAveragePrice(
        _.get(totalTicketGroupFind, "quantity"),
        _.get(totalTicketGroupFind, "total", 0)
      );

      const ticketPurchased = new PurchasedAsset(
        0,
        price,
        _.get(totalTicketGroupFind, "quantity"),
        item.assetCode,
        item.brokerName,
        item.date,
        item.transactionType,
        item.currencyCode
      );

      ticketPurchased.total = ticketPurchased.calculateTotal();
      ticketPurchased.apportionmentPercentage =
        ticketPurchased.calculatePercentage(this.total, ticketPurchased.total);
      ticketPurchased.apportionmentValue =
        ticketPurchased.calculateApportionmentValue(
          this.totalFees,
          ticketPurchased.apportionmentPercentage
        );
      /* ticketPurchased.totalWithFees = ticketPurchased.calculateTotalWithFees(
        this.total,
        this.totalFees,
        ticketPurchased.total,
        ticketPurchased.apportionmentValue,
        item.transactionType
      );*/

      tickets.push(ticketPurchased);
    }

    return tickets;
  }
}
