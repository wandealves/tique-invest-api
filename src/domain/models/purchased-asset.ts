import { Asset } from "./asset";
import { Investment } from "./investment";
import { User } from "./user";

export class PurchasedAsset {
  private readonly id: number;
  private readonly price: number;
  private readonly quantity: number;
  private readonly asset: Asset;
  private readonly investment: Investment;
  private readonly user: User;

  constructor(
    id: number,
    price: number,
    quantity: number,
    asset: Asset,
    investment: Investment,
    user: User
  ) {
    this.id = id;
    this.price = price;
    this.quantity = quantity;
    this.asset = asset;
    this.investment = investment;
    this.user = user;
  }
}
