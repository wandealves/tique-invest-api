import { Country } from "../models/country";

export interface ICreateCountry {
  create: (country: Country) => Promise<number>;
}
