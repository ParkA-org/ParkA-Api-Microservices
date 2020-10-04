import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateCountryInput } from './inputs/create-country.input';
import { GetCountryByIdInput } from './inputs/get-country-by-id.input';
import { UpdateCountryInput } from './inputs/update-country.input';
import { CountryType } from './types/country.type';

@Injectable()
export class CountryService {
  private client: ClientProxy;
  private logger = new Logger();

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: `${process.env.REDIS_URL}`,
      },
    });
  }

  public async getCountryById(
    getCountryByIdInput: GetCountryByIdInput,
  ): Promise<CountryType> {
    this.logger.debug(
      `Received get country by id with payload ${JSON.stringify(
        getCountryByIdInput,
      )}`,
    );

    const response = this.client.send<CountryType>(
      { type: 'get-country-by-id' },
      getCountryByIdInput,
    );

    return response.toPromise();
  }

  public async getAllCountries(): Promise<CountryType[]> {
    this.logger.debug(`Received get all countries`);

    const response = this.client.send<CountryType[]>(
      { type: 'get-all-countries' },
      {},
    );

    return response.toPromise();
  }

  public async createCountry(
    createCountryInput: CreateCountryInput,
  ): Promise<CountryType> {
    this.logger.debug(
      `Received create country with payload ${JSON.stringify(
        createCountryInput,
      )}`,
    );

    const response = this.client.send<CountryType>(
      { type: 'create-country' },
      createCountryInput,
    );

    return response.toPromise();
  }

  public async updateCountry(
    updateCountryInput: UpdateCountryInput,
  ): Promise<CountryType> {
    this.logger.debug(
      `Received update country with payload ${JSON.stringify(
        updateCountryInput,
      )}`,
    );

    const response = this.client.send<CountryType>(
      { type: 'update-country' },
      updateCountryInput,
    );

    return response.toPromise();
  }
}
