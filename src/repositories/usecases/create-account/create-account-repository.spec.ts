import { AccountRepository } from "./create-account-repository";
import { Encrypter } from "../../protocols/encrypter";

interface SutTypes {
  sut: AccountRepository;
  encrypterStub: Encrypter;
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise(resolver => resolver("hashed_password"));
    }
  }

  return new EncrypterStub();
};

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const sut = new AccountRepository(encrypterStub);

  return {
    sut,
    encrypterStub
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
      .mockReturnValueOnce(
        new Promise((_, reject) => reject(new Error()))
      );
    const accountdata = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password"
    };
    const promise = sut.create(accountdata);
    await expect(promise).rejects.toThrow();
  });
});
