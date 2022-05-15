import { Country } from "./country";
import { PurchasedAsset } from "./purchased-asset";
import { User } from "./user";

export class Investment {
  private readonly id: number;
  private readonly total: number;
  private readonly country: Country;
  private readonly user: User;
  private readonly purchasedAssets: PurchasedAsset[];

  constructor(
    id: number,
    total: number,
    country: Country,
    user: User,
    purchasedAssets: PurchasedAsset[]
  ) {
    this.id = id;
    this.total = total;
    this.country = country;
    this.user = user;
    this.purchasedAssets = purchasedAssets;
  }
}
