import { getMonth, getYear } from "date-fns";

import { Asset } from "./asset";
import { Investment } from "./investment";

export class PurchasedAsset {
  private readonly id: number;
  private readonly price: number;
  private readonly quantity: number;
  private readonly total: number;
  private readonly date: Date;
  private readonly month: number;
  private readonly year: number;

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
    this.date = date;
    this.month = getMonth(this.date);
    this.year = getYear(this.date);

    this.asset = asset;
    this.investment = investment;
  }

  public calculateTotal(): number {
    return this.price * this.quantity;
  }
}
