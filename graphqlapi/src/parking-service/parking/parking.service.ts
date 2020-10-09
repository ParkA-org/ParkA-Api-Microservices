import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ParkingType } from './types/parking.type';

@Injectable()
export class ParkingService {
  private logger = new Logger('ParkingService');
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: { url: `${process.env.REDIS_URL}` },
    });
  }

  public async getParkingById(id: string): Promise<ParkingType> {
    this.logger.debug(
      `Received get user information by id with payload ${JSON.stringify(id)}`,
    );

    const response = await this.client.send<ParkingType>(
      { type: 'get-parking-by-id' },
      id,
    );

    return response.toPromise();
  }

  public async createParking(
    createParkingInput: CreateParkingInput,
  ): Promise<ParkingType> {
    this.logger.debug(
      `Received create parking with payload ${JSON.stringify(
        createParkingInput,
      )}`,
    );

    const response = await this.client.send<ParkingType>(
      { type: 'createParking' },
      createParkingInput,
    );

    return response.toPromise();
  }
}
