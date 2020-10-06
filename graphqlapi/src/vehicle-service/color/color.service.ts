import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateColorInput } from './inputs/create-color.input';
import { GetColorByIdInput } from './inputs/get-color-by-id.input';
import { ColorType } from './types/color.type';

@Injectable()
export class ColorService {
  private client: ClientProxy;
  private logger = new Logger('ColorService');

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: `${process.env.REDIS_URL}`,
      },
    });
  }

  public async getColorById(
    getColorByIdInput: GetColorByIdInput,
  ): Promise<ColorType> {
    this.logger.debug(
      `Received get color by id with payload ${JSON.stringify(
        getColorByIdInput,
      )}`,
    );

    const response = this.client.send<ColorType>(
      {
        type: 'get-color-by-id',
      },
      getColorByIdInput,
    );

    return await response.toPromise();
  }

  public async getAllColors(): Promise<ColorType[]> {
    this.logger.debug(`Received get all colors`);

    const response = this.client.send<ColorType[]>(
      {
        type: 'get-all-colors',
      },
      {},
    );

    return await response.toPromise();
  }

  public async createColor(
    createColorInput: CreateColorInput,
  ): Promise<ColorType> {
    this.logger.debug(
      `Received create color input ${JSON.stringify(createColorInput)}`,
    );

    const response = this.client.send<ColorType>(
      {
        type: 'create-color',
      },
      createColorInput,
    );

    return await response.toPromise();
  }
}
