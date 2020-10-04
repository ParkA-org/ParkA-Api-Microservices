import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dtos/create-country.dto';
import { GetCountryByIdDto } from './dtos/get-country-by-id.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { Country } from './entities/country.entity';

@Controller('countries')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @MessagePattern({ type: 'get-country-by-id' })
  public async getCountryById(
    getCountryByIdDto: GetCountryByIdDto,
  ): Promise<Country> {
    return this.countryService.getCountryById(getCountryByIdDto);
  }

  @MessagePattern({ type: 'get-all-countries' })
  public async getAllCountries(): Promise<Country[]> {
    return this.countryService.getAllCountries();
  }

  @MessagePattern({ type: 'create-country' })
  public async createCountry(
    createCountryDto: CreateCountryDto,
  ): Promise<Country> {
    return this.countryService.createCountry(createCountryDto);
  }

  @MessagePattern({ type: 'update-country' })
  public async updateCountry(
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    return this.countryService.updateCountry(updateCountryDto);
  }
}
