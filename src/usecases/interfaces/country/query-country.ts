import { Country } from "../../../domain/models";

export interface IQueryCountry {
  all: () => Promise<Country[] | null>;
  filter: (query: any) => Promise<Country[] | null>;
  findOne: (id: number) => Promise<Country | null>;
  find: (query: any) => Promise<Country | null>;
}
