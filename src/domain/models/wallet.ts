import _ from "lodash";

import { PurchasedAsset } from "./purchased-asset";

import { CurrencyCode } from "./enums";

export class Wallet {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _total: number;
  private readonly _totalFees: number;
  private readonly _currencyCode: CurrencyCode;
  private readonly _userId: number;

  constructor(
    id: number,
    name: string,
    total: number,
    totalFees: number,
    currencyCode: CurrencyCode,
    userId: number
  ) {
    this._id = id;
    this._name = name;
    this._total = total;
    this._totalFees = totalFees;
    this._currencyCode = currencyCode;
    this._userId = userId;
  }
}
