import { Country } from "../../domain/models/country";

export interface ICountryRepository {
  create(country: Country): Promise<number>;
}
