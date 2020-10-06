import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { BodyStyleType } from './types/body-style.type';
import { CreateBodyStyleInput } from './inputs/body-style-type.input';
import { GetBodyStyleByIdInput } from './inputs/get-body-style-by-id.input';

@Injectable()
export class BodyStyleService {
  private client: ClientProxy;
  private logger = new Logger('BodyStyleService');

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: `${process.env.REDIS_URL}`,
      },
    });
  }

  public async getBodyStyleById(
    getBodyStyleByIdInput: GetBodyStyleByIdInput,
  ): Promise<BodyStyleType> {
    this.logger.debug(
      `Received get body style by input with payload ${JSON.stringify(
        getBodyStyleByIdInput,
      )}`,
    );

    const response = await this.client.send<BodyStyleType>(
      { type: 'get-vehicle-type-by-id' },
      getBodyStyleByIdInput,
    );

    return response.toPromise();
  }

  public async getAllBodyStyles(): Promise<BodyStyleType[]> {
    this.logger.debug(`Received get all body styles`);

    const response = await this.client.send<BodyStyleType[]>(
      { type: 'get-vehicle-all-types' },
      {},
    );

    return response.toPromise();
  }

  public async createBodyStyle(
    createBodyStyleInput: CreateBodyStyleInput,
  ): Promise<BodyStyleType> {
    this.logger.debug(
      `Received create body style with payload ${JSON.stringify(
        createBodyStyleInput,
      )}`,
    );

    const response = await this.client.send<BodyStyleType>(
      { type: 'create-vehicle-all-types' },
      createBodyStyleInput,
    );

    return response.toPromise();
  }
}
