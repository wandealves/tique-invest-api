import { BaseError } from "./base-error";

export class handlePurchasedAssetError extends Error implements BaseError {
  constructor(message: string) {
    super(message);
    this.name = "handlePurchasedAsset";
  }
}
