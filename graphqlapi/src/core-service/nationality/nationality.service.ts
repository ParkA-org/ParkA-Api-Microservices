import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { GetNationalityByIdInput } from './inputs/get-nationality-by-id.input';
import { NationalityType } from './types/nationality.type';

@Injectable()
export class NationalityService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: `redis://redis-parka-microservices:6379`,
      },
    });
  }

  public async getNationalityById(
    getNationalityByIdInput: GetNationalityByIdInput,
  ): Promise<NationalityType> {
    const response = this.client.send<NationalityType>(
      { type: 'get-nationality-by-id' },
      {},
    );

    return response.toPromise();
  }

  public async getAllNationalities(): Promise<NationalityType[]> {
    const response = this.client.send<NationalityType[]>(
      { type: 'get-all-nationalities' },
      {},
    );

    return response.toPromise();
  }
}
