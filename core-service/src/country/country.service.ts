import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCountryByIdDto } from './dtos/get-country-by-id.dto';
import { Country } from './entities/country.entity';
import { v4 as uuid } from 'uuid';
import { CreateCountryDto } from './dtos/create-country.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CountryService {
  private logger = new Logger('CountryService');

  constructor(
    @InjectRepository(Country) private countryRepository: Repository<Country>,
  ) {}

  public async getCountryById(
    getCountryByIdDto: GetCountryByIdDto,
  ): Promise<Country> {
    this.logger.debug(
      `Received get country by id ${JSON.stringify(getCountryByIdDto)}`,
    );

    const result = await this.countryRepository.findOne(getCountryByIdDto);

    if (!result) {
      throw new RpcException('Entry not found');
    }

    return result;
  }

  public async getAllCountries(): Promise<Country[]> {
    this.logger.debug(`Received get all countries`);

    return this.countryRepository.find();
  }

  public async createCountry(
    createCountryDto: CreateCountryDto,
  ): Promise<Country> {
    this.logger.debug(
      `Received create country with payload ${JSON.stringify(
        createCountryDto,
      )}`,
    );

    const { name } = createCountryDto;

    const country = this.countryRepository.create({
      id: uuid(),
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return this.countryRepository.save(country);
  }

  public async updateCountry(
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    this.logger.debug(
      `Received create country with payload ${JSON.stringify(
        updateCountryDto,
      )}`,
    );

    const {
      getCountryByIdPayload: getCountryByIdDto,
      updateCountryPayload,
    } = updateCountryDto;

    const country = await this.getCountryById(getCountryByIdDto);

    const fieldToUpdateList = Object.keys(updateCountryPayload);

    for (const field of fieldToUpdateList) {
      country[field] = updateCountryPayload[field];
    }

    return this.countryRepository.save(country);
  }
}
