import { CreateAccount, CreateAccountModel, Encrypter } from "../interfaces";
import { CreateAccountRepository } from "../interfaces/repositories";
import { AccountModel } from "../../domain/models";

export class AccountRepository implements CreateAccount {
  private readonly encrypter: Encrypter;
  private readonly createAccountRepository: CreateAccountRepository;

  constructor(
    encrypter: Encrypter,
    createAccountRepository: CreateAccountRepository
  ) {
    this.encrypter = encrypter;
    this.createAccountRepository = createAccountRepository;
  }

  async create(accountData: CreateAccountModel): Promise<AccountModel | null> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    const account = await this.createAccountRepository.create({
      ...accountData,
      password: hashedPassword
    });
    return account;
  }
}
