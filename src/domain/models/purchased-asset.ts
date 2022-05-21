import { Asset } from "./asset";
import { Investment } from "./investment";
import { User } from "./user";

export class PurchasedAsset {
  private readonly id: number;
  private readonly price: number;
  private readonly quantity: number;
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
    month: number,
    year: number,
    asset: Asset,
    investment: Investment
  ) {
    this.id = id;
    this.price = price;
    this.quantity = quantity;
    this.date = date;
    this.month = month;
    this.year = year;

    this.asset = asset;
    this.investment = investment;
  }
}
