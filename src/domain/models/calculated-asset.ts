import { getMonth, getYear } from "date-fns";
import _ from "lodash";

import { Fees } from "./fees";
import { TransactionType, CurrencyCode } from "./enums";

export class CalculatedAsset {
  private _id: number;
  private _averagePrice: number;
  private _quantity: number;
  private _total: number;
  private _brokerName: string;
  private _transactionType: TransactionType;
  private _currencyCode: CurrencyCode;

  private _assetId: number;
  private _walletId: number;

  set averagePrice(value: number) {
    this._averagePrice = value;
  }

  get averagePrice(): number {
    return this._averagePrice;
  }

  set total(value: number) {
    this._total = value;
  }

  get total(): number {
    return this._total;
  }

  set brokerName(value: string) {
    this._brokerName = value;
  }

  get brokerName(): string {
    return this._brokerName;
  }

  set transactionType(value: TransactionType) {
    this._transactionType = value;
  }

  get transactionType(): TransactionType {
    return this._transactionType;
  }

  set currencyCode(value: CurrencyCode) {
    this._currencyCode = value;
  }

  get currencyCode(): CurrencyCode {
    return this._currencyCode;
  }

  get assetId(): number {
    return this._assetId;
  }

  set assetId(value: number) {
    this._assetId = value;
  }

  get walletId(): number {
    return this._walletId;
  }

  set walletId(value: number) {
    this._walletId = value;
  }

  constructor(
    id: number,
    averagePrice: number,
    quantity: number,
    brokerName: string,
    transactionType: TransactionType,
    currencyCode: CurrencyCode
  ) {
    this._id = id;
    this._averagePrice = averagePrice;
    this._quantity = quantity;
    this._brokerName = brokerName;

    this._transactionType = transactionType;
    this._currencyCode = currencyCode;

    this._assetId = 0;
    this._walletId = 0;

    this._total = 0;
  }
}
