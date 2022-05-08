import {
  CreateAccount,
  CreateAccountModel,
  AccountModel,
  Encrypter
} from "./create-account-protocols";

export class AccountRepository implements CreateAccount {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async create(account: CreateAccountModel): Promise<AccountModel | null> {
    await this.encrypter.encrypt(account.password);
    return new Promise(resolve => resolve(null));
  }
}
