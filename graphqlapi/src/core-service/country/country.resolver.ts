import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CountryService } from './country.service';
import { CreateCountryInput } from './inputs/create-country.input';
import { GetCountryByIdInput } from './inputs/get-country-by-id.input';
import { UpdateCountryInput } from './inputs/update-country.input';
import { CountryType } from './types/country.type';

@Resolver(of => CountryType)
export class CountryResolver {
  constructor(private countryService: CountryService) {}

  @Query(returns => CountryType)
  public async getCountryById(
    @Args('getCountryByIdInput')
    getCountryByIdInput: GetCountryByIdInput,
  ): Promise<CountryType> {
    return this.countryService.getCountryById(getCountryByIdInput);
  }

  @Query(returns => [CountryType])
  public async getAllCountries(): Promise<CountryType[]> {
    return this.countryService.getAllCountries();
  }

  @Mutation(of => CountryType)
  public async createCountry(
    @Args('createCountryInput')
    createCountryInput: CreateCountryInput,
  ): Promise<CountryType> {
    return this.countryService.createCountry(createCountryInput);
  }

  @Mutation(of => CountryType)
  public async updateCountry(
    @Args('updateCountryInput')
    updateCountryInput: UpdateCountryInput,
  ): Promise<CountryType> {
    return this.countryService.updateCountry(updateCountryInput);
  }
}
