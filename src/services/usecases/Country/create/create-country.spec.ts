import { Country, ICountryRepository } from "../../../interfaces";
import { CreateCountry } from "./create-country";
import { makeCountryRepositoryRepository } from "../../../helpers";

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
  test("Deve chamar criar do repositório com valores corretos", async () => {
    const { sut, countryRepositoryStub } = makeSut();
    const countrydata: Country = new Country(1, "valid_name");

    const createSpy = jest.spyOn(countryRepositoryStub, "create");

    await sut.create(countrydata);
    expect(createSpy).toHaveBeenCalledWith(countrydata);
  });
  test("Deve lançar exceção se criar país for chamado", async () => {
    const { sut, countryRepositoryStub } = makeSut();

    jest
      .spyOn(countryRepositoryStub, "create")
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const countrydata: Country = new Country(1, "valid_name");
    const promise = sut.create(countrydata);
    await expect(promise).rejects.toThrow();
  });
  test("Deve retornar sucesso ao criar país", async () => {
    const { sut, countryRepositoryStub } = makeSut();
    const countrydata: Country = new Country(1, "valid_name");
    const country = await sut.create(countrydata);
    expect(country).toEqual(1);
  });
});
