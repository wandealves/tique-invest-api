import { Asset } from "./asset";
import { Country } from "./country";
import { User } from "./user";

export class Investment {
  private readonly id: number;
  private readonly total: number;
  private readonly country: Country;
  private readonly user: User;
  private readonly assets: Asset[];

  constructor(
    id: number,
    total: number,
    country: Country,
    user: User,
    assets: Asset[]
  ) {
    this.id = id;
    this.total = total;
    this.country = country;
    this.user = user;
    this.assets = assets;
  }
}
