import _ from "lodash";

import { Country } from "./country";
import { User } from "./user";
import { TypeAsset } from "./enums/type-asset";

export class Investment {
  private readonly id: number;
  private readonly total: number;
  private readonly totalFees: number;
  private readonly type: TypeAsset;
  private readonly countryId: number;
  private readonly country: Country | null;
  private readonly userId: number;
  private readonly user: User | null;

  constructor(
    id: number,
    total: number,
    totalFees: number,
    type: TypeAsset,
    country: Country,
    user: User
  ) {
    this.id = id;
    this.total = total;
    this.totalFees = totalFees;
    this.type = type;
    this.countryId = _.get(country, "id", 0);
    this.country = country;
    this.userId = _.get(user, "id", 0);
    this.user = user;
  }
}
