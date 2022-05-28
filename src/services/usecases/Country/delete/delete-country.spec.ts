import { Country, ICountryRepository } from "../../../interfaces";
import { DeleteCountry } from "./delete-country";
import { makeCountryRepositoryRepository } from "../../../helpers";

interface SutTypes {
  sut: DeleteCountry;
  countryRepositoryStub: ICountryRepository;
}

const makeSut = (): SutTypes => {
  const countryRepositoryStub = makeCountryRepositoryRepository();
  const sut = new DeleteCountry(countryRepositoryStub);

  return {
    sut,
    countryRepositoryStub
  };
};

describe("Caso de Uso Deletar País", () => {
  test("Deve chamar deletar do repositório com valores corretos", async () => {
    const { sut, countryRepositoryStub } = makeSut();

    const createSpy = jest.spyOn(countryRepositoryStub, "delete");

    await sut.execute(1);
    expect(createSpy).toHaveBeenCalledWith(1);
  });
  test("Deve lançar exceção se funcionalidade de deletar país for chamado", async () => {
    const { sut, countryRepositoryStub } = makeSut();

    jest
      .spyOn(countryRepositoryStub, "delete")
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const countrydata: Country = new Country(1, "valid_name");
    const promise = sut.execute(1);
    await expect(promise).rejects.toThrow();
  });
  test("Deve retornar sucesso ao deletar país", async () => {
    const { sut } = makeSut();
    const country = await sut.execute(1);
    expect(country).toBe(void 0);
  });
});
