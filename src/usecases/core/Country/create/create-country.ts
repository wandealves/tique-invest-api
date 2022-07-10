import { ICreateCountry } from "../../../interfaces";
import { ICountryRepository } from "../../../interfaces/repositories";
import { Country } from "../../../../domain/models";

export class CreateCountry implements ICreateCountry {
  private readonly countryRepository: ICountryRepository;

  constructor(countryRepository: ICountryRepository) {
    this.countryRepository = countryRepository;
  }

  async create(country: Country): Promise<number> {
    const result = await this.countryRepository.create(country);
    return result;
  }
}
