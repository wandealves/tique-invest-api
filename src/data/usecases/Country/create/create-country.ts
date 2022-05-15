import {
  Country,
  ICreateCountry,
  ICountryRepository
} from "../../../protocols";

export class CreateCountry implements ICreateCountry {
  private readonly countryRepository: ICountryRepository;

  constructor(countryRepository: ICountryRepository) {
    this.countryRepository = countryRepository;
  }

  async create(country: Country): Promise<number> {
    console.log('country',country)
    const result = await this.countryRepository.create(country);
    console.log('result',result)
    return result;
  }
}
