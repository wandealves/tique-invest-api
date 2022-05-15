import { Country } from "../models/country";

export interface IQueryCountry {
  all: () => Promise<Country[] | null>;
  filter: (query: any) => Promise<Country[] | null>;
  findOne: (id: number) => Promise<Country | null>;
  find: (query: any) => Promise<Country | null>;
}
