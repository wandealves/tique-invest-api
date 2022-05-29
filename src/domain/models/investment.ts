import _ from "lodash";

import { TypeAsset } from "./enums/type-asset";

export class Investment {
  private id: number;
  private total: number;
  private totalFees: number;
  private type: TypeAsset;
  private countryId: number;
  private userId: number;

  constructor(
    id: number,
    total: number,
    totalFees: number,
    type: TypeAsset,
    countryId: number,
    userId: number
  ) {
    this.id = id;
    this.total = total;
    this.totalFees = totalFees;
    this.type = type;
    this.countryId = countryId;
    this.userId = userId;
  }
}
