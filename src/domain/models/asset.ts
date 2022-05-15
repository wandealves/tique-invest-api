import { TypeAsset } from "./enums/type-asset";
import { Investment } from "./investment";
import { User } from "./user";

export class Asset {
  private readonly id: number;
  private readonly name: string;
  private readonly code: string;
  private readonly price: number;
  private readonly quantity: number;
  private readonly iconUrl: string;
  private readonly type: TypeAsset;
  private readonly user: User;
  private readonly investment: Investment;

  constructor(
    id: number,
    name: string,
    code: string,
    price: number,
    quantity: number,
    iconUrl: string,
    type: TypeAsset,
    user: User,
    investment: Investment
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.price = price;
    this.quantity = quantity;
    this.iconUrl = iconUrl;
    this.type = type;
    this.user = user;
    this.investment = investment;
  }
}
