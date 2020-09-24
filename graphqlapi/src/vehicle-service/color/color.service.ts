import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreateColorInput } from './inputs/create-color.input';
import { GetColorByIdInput } from './inputs/get-color-by-id.input';
import { ColorType } from './types/color.type';

@Injectable()
export class ColorService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://redis-parka-microservices:6379`,
    },
  })
  private client: ClientProxy;

  public async getColorById(
    getColorByIdInput: GetColorByIdInput,
  ): Promise<ColorType> {
    const response = this.client.send<ColorType>(
      {
        type: 'get-color-by-id',
      },
      getColorByIdInput,
    );

    return await response.toPromise();
  }

  public async getAllColors(): Promise<ColorType[]> {
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
    const response = this.client.send<ColorType>(
      {
        type: 'create-color',
      },
      createColorInput,
    );

    return await response.toPromise();
  }
}
