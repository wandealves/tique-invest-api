import _ from "lodash";

import { Country } from "./country";
import { User } from "./user";
import { TypeAsset } from "./enums/type-asset";

export class Investment {
  private id: number;
  private total: number;
  private type: TypeAsset;
  private countryId: number;
  private country: Country | null;
  private userId: number;
  private user: User | null;

  constructor(id: number, type: TypeAsset, country: Country, user: User);
  constructor(id: number, type: TypeAsset, countryId: number, userId: number);
  constructor();

  constructor(...myarray: any[]) {
    this.total = 0;

    if (myarray.length === 4) {
      if (myarray[2] instanceof Country && myarray[3] instanceof User) {
        this.id = myarray[0];
        this.type = myarray[1];
        this.countryId = _.get(myarray[2], "id", 0);
        this.country = myarray[2];
        this.userId = _.get(myarray[3], "id", 0);
        this.user = myarray[3];
        return;
      } else {
        this.id = myarray[0];
        this.type = myarray[1];
        this.country = null;
        this.countryId = myarray[2];
        this.user = null;
        this.userId = myarray[3];
        return;
      }
    }
    this.id = 0;
    this.type = TypeAsset.ACAO;
    this.countryId = 0;
    this.country = null;
    this.userId = 0;
    this.user = null;
  }
}
