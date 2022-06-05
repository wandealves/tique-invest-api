import { BaseError } from "./base-error";

export class CreateWalletError extends Error implements BaseError {
  constructor(message: string) {
    super(message);
    this.name = "CreateWalletError";
  }
}
