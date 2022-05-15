import { Country, ICountryRepository } from "../../protocols";

export const makeCountryRepositoryRepository = (): ICountryRepository => {
  class CountryRepositoryStub implements ICountryRepository {
    delete(id: number): Promise<void> {
      return new Promise(resolver => resolver());
    }
    async create(country: Country): Promise<number> {
      return new Promise(resolver => resolver(1));
    }
    async all(): Promise<Country[] | null> {
      const country_01 = new Country(1, "valid_name_1");
      const country_02 = new Country(2, "valid_name_2");

      return new Promise(resolver => resolver([country_01, country_02]));
    }

    async filter(query: any): Promise<Country[] | null> {
      const country_01 = new Country(1, "valid_name_1");
      const country_02 = new Country(2, "valid_name_2");

      return new Promise(resolver => resolver([country_01, country_02]));
    }

    async findOne(id: number): Promise<Country | null> {
      const country = new Country(1, "valid_name");

      return new Promise(resolver => resolver(country));
    }

    async find(query: any): Promise<Country | null> {
      const country = new Country(1, "valid_name");

      return new Promise(resolver => resolver(country));
    }
  }

  return new CountryRepositoryStub();
};
