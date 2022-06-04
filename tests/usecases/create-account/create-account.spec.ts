import { AccountRepository } from "../../../src/usecases/create-account/create-account";
import {
  Encrypter,
  CreateAccountModel
} from "../../../src/usecases/interfaces";
import { CreateAccountRepository } from "../../../src/usecases/interfaces/repositories";
import { AccountModel } from "../../../src/domain/models";

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise(resolver => resolver("hashed_password"));
    }
  }

  return new EncrypterStub();
};

const makeCreateAccountRepository = (): CreateAccountRepository => {
  class CreateAccountRepositoryStub implements CreateAccountRepository {
    async create(accountData: CreateAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email",
        password: "hashed_password"
      };
      return new Promise(resolver => resolver(fakeAccount));
    }
  }

  return new CreateAccountRepositoryStub();
};

interface SutTypes {
  sut: AccountRepository;
  encrypterStub: Encrypter;
  createAccountRepositoryStub: CreateAccountRepository;
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const createAccountRepositoryStub = makeCreateAccountRepository();
  const sut = new AccountRepository(encrypterStub, createAccountRepositoryStub);

  return {
    sut,
    encrypterStub,
    createAccountRepositoryStub
  };
};

describe("Repository Accounr Usecase", () => {
  test("Should call Encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();

    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
    const accountdata = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password"
    };
    await sut.create(accountdata);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });
  test("Should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();

    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));
    const accountdata = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password"
    };
    const promise = sut.create(accountdata);
    await expect(promise).rejects.toThrow();
  });
  test("Should call createAccountRepository with correct values", async () => {
    const { sut, createAccountRepositoryStub } = makeSut();

    const createSpy = jest.spyOn(createAccountRepositoryStub, "create");
    const accountdata = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password"
    };
    await sut.create(accountdata);
    expect(createSpy).toHaveBeenCalledWith({
      name: "valid_name",
      email: "valid_email",
      password: "hashed_password"
    });
  });
  test("Should throw if create Account throws", async () => {
    const { sut, createAccountRepositoryStub } = makeSut();

    jest
      .spyOn(createAccountRepositoryStub, "create")
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const accountdata = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password"
    };
    const promise = sut.create(accountdata);
    await expect(promise).rejects.toThrow();
  });
  test("Should return an account on success", async () => {
    const { sut, createAccountRepositoryStub } = makeSut();
    const accountdata = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password"
    };
    const account = await sut.create(accountdata);
    expect(account).toEqual({
      id: "valid_id",
      name: "valid_name",
      email: "valid_email",
      password: "hashed_password"
    });
  });
});