import { Country } from "../../../domain/models";

export interface ICountryRepository {
  create(country: Country): Promise<number>;
  delete(id: number): Promise<void>;

  all: () => Promise<Country[] | null>;
  filter: (query: any) => Promise<Country[] | null>;
  findOne: (id: number) => Promise<Country | null>;
  find: (query: any) => Promise<Country | null>;
}
