import { IQueryCountry, ICountryRepository, Country } from "../../../interfaces";

export class QueryCountry implements IQueryCountry {
  private readonly countryRepository: ICountryRepository;

  constructor(countryRepository: ICountryRepository) {
    this.countryRepository = countryRepository;
  }

  async all(): Promise<Country[] | null> {
    const result = await this.countryRepository.all();
    return result;
  }

  async filter(query: any): Promise<Country[] | null> {
    const result = await this.countryRepository.filter(query);
    return result;
  }

  async findOne(id: number): Promise<Country | null> {
    const result = await this.countryRepository.findOne(id);
    return result;
  }

  async find(query: any): Promise<Country | null> {
    const result = await this.countryRepository.find(query);
    return result;
  }
}
