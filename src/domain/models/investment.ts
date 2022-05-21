import { Country } from "./country";
import { PurchasedAsset } from "./purchased-asset";
import { User } from "./user";
import { TypeAsset } from "./enums/type-asset";

export class Investment {
  private readonly id: number;
  private readonly total: number;
  private readonly type: TypeAsset;
  private readonly country: Country;
  private readonly user: User;

  constructor(
    id: number,
    total: number,
    type: TypeAsset,
    country: Country,
    user: User
  ) {
    this.id = id;
    this.total = total;
    this.type = type;
    this.country = country;
    this.user = user;
  }
}
