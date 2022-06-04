import { Country } from "../../../domain/models";

export interface ICreateCountry {
  create: (country: Country) => Promise<number>;
}
