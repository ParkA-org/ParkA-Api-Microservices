import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { BodyStyleType } from './types/body-style.type';
import { CreateBodyStyleInput } from './inputs/body-style-type.input';
import { GetBodyStyleByIdInput } from './inputs/get-body-style-by-id.input';

@Injectable()
export class BodyStyleService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://redis-parka-microservices:6379`,
    },
  })
  private client: ClientProxy;

  public async getBodyStyleById(
    getBodyStyleByIdInput: GetBodyStyleByIdInput,
  ): Promise<BodyStyleType> {
    const response = await this.client.send<BodyStyleType>(
      { type: 'get-vehicle-type-by-id' },
      getBodyStyleByIdInput,
    );

    return response.toPromise();
  }

  public async getAllBodyStyles(): Promise<BodyStyleType[]> {
    const response = await this.client.send<BodyStyleType[]>(
      { type: 'get-vehicle-all-types' },
      {},
    );

    return response.toPromise();
  }

  public async createBodyStyle(
    createBodyStyleInput: CreateBodyStyleInput,
  ): Promise<BodyStyleType> {
    const response = await this.client.send<BodyStyleType>(
      { type: 'create-vehicle-all-types' },
      createBodyStyleInput,
    );

    return response.toPromise();
  }
}
