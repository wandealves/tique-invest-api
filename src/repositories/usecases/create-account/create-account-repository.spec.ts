import { AccountRepository } from "./create-account-repository";
import { Encrypter } from "../../protocols/encrypter";

interface SutTypes {
  sut: AccountRepository;
  encrypterStub: Encrypter;
}

const makeSut = (): SutTypes => {
  class EncrypterStub {
    async encrypt(value: string): Promise<string> {
      return new Promise(resolver => resolver("hashed_password"));
    }
  }

  const encrypterStub = new EncrypterStub();
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
});
