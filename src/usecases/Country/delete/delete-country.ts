import {
  IDeleteCountry,
  ICountryRepository
} from "../../interfaces";

export class DeleteCountry implements IDeleteCountry {
  private readonly countryRepository: ICountryRepository;

  constructor(countryRepository: ICountryRepository) {
    this.countryRepository = countryRepository;
  }

  async execute(id: number): Promise<void> {
    await this.countryRepository.delete(id);
  }
}
