import {
  CreateAccount,
  CreateAccountModel
} from "../../../domain/usecases/create-account";
import { AccountModel } from "../../../domain/models/account";
import { Encrypter } from "../../protocols/encrypter";

export class AccountRepository implements CreateAccount {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async create(account: CreateAccountModel): Promise<AccountModel | null> {
    await this.encrypter.encrypt(account.password)
    return new Promise(resolve => resolve(null));
  }
}
