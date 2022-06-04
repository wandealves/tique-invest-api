import { CreateAccountModel } from "../account/create-account";
import { AccountModel } from "../../../domain/models/account";

export interface CreateAccountRepository {
  create(accountData: CreateAccountModel): Promise<AccountModel>;
}