import { Country, ICountryRepository } from "../../../protocols";
import { CreateCountry } from "./create-country";

const makeCountryRepositoryRepository = (): ICountryRepository => {
  class CountryRepositoryStub implements ICountryRepository {
    async create(country: Country): Promise<number> {
      return new Promise(resolver => resolver(1));
    }
  }

  return new CountryRepositoryStub();
};

interface SutTypes {
  sut: CreateCountry;
  countryRepositoryStub: ICountryRepository;
}

const makeSut = (): SutTypes => {
  const countryRepositoryStub = makeCountryRepositoryRepository();
  const sut = new CreateCountry(countryRepositoryStub);

  return {
    sut,
    countryRepositoryStub
  };
};

describe("Caso de Uso Criar Países", () => {
  test("Deve chamar createCountryRepository com valores corretos", async () => {
    const { sut, countryRepositoryStub } = makeSut();
    const countrydata: Country = new Country(1, "valid_name");
    
    const createSpy = jest.spyOn(countryRepositoryStub, "create");
  
    await sut.create(countrydata);
    expect(createSpy).toHaveBeenCalledWith(countrydata);
  });

  /*test("Should call Encrypter with correct password", async () => {
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
  });*/
});
