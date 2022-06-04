import {
  Country,
  ICreateCountry,
  ICountryRepository
} from "../../interfaces";

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
