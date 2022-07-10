import { CreateAccount, CreateAccountModel, IEncrypter } from "../../interfaces";
import { CreateAccountRepository } from "../../interfaces/repositories";
import { AccountModel } from "../../../domain/models";

export class AccountRepository implements CreateAccount {
  private readonly encrypter: IEncrypter;
  private readonly createAccountRepository: CreateAccountRepository;

  constructor(
    encrypter: IEncrypter,
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
