import { Country, ICountryRepository } from "../../protocols";

export const makeCountryRepositoryRepository = (): ICountryRepository => {
  class CountryRepositoryStub implements ICountryRepository {
    delete(id: number): Promise<void> {
      return new Promise(resolver => resolver());
    }
    async create(country: Country): Promise<number> {
      return new Promise(resolver => resolver(1));
    }
  }

  return new CountryRepositoryStub();
};
