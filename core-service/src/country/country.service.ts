import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCountryByIdDto } from './dtos/get-country-by-id.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private countryRepository: Repository<Country>,
  ) {}

  public async getCountryById(
    getCountryByIdDto: GetCountryByIdDto,
  ): Promise<Country> {
    return this.countryRepository.findOne(getCountryByIdDto);
  }

  public async getAllCountries(): Promise<Country[]> {
    return this.countryRepository.find();
  }
}
