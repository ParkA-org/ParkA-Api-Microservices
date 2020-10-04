import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CountryService } from './country.service';
import { CreateCountryInput } from './inputs/create-country.input';
import { GetCountryByIdInput } from './inputs/get-country-by-id.input';
import { UpdateCountryInput } from './inputs/update-country.input';
import { CountryType } from './types/country.type';

@Resolver(of => CountryType)
export class CountryResolver {
  private logger = new Logger('CountryResolver');

  constructor(private countryService: CountryService) {}

  @Query(returns => CountryType)
  public async getCountryById(
    @Args('getCountryByIdInput')
    getCountryByIdInput: GetCountryByIdInput,
  ): Promise<CountryType> {
    this.logger.debug(
      `Received get country by id with payload ${JSON.stringify(
        getCountryByIdInput,
      )}`,
    );

    return this.countryService.getCountryById(getCountryByIdInput);
  }

  @Query(returns => [CountryType])
  public async getAllCountries(): Promise<CountryType[]> {
    this.logger.debug(`Received get all countries`);

    return this.countryService.getAllCountries();
  }

  @Mutation(of => CountryType)
  public async createCountry(
    @Args('createCountryInput')
    createCountryInput: CreateCountryInput,
  ): Promise<CountryType> {
    this.logger.debug(
      `Received create country with payload ${JSON.stringify(
        createCountryInput,
      )}`,
    );

    return this.countryService.createCountry(createCountryInput);
  }

  @Mutation(of => CountryType)
  public async updateCountry(
    @Args('updateCountryInput')
    updateCountryInput: UpdateCountryInput,
  ): Promise<CountryType> {
    this.logger.debug(
      `Received update country with payload ${JSON.stringify(
        updateCountryInput,
      )}`,
    );

    return this.countryService.updateCountry(updateCountryInput);
  }
}
