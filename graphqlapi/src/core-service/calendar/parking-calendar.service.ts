import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { GetParkingCalendarInput } from './inputs/get-parking-avaliability.input';
import { ParkingCalendarType } from './types/calendar.type';

@Injectable()
export class ParkingCalendarService {
  private client: ClientProxy;
  private logger = new Logger('ParkingCalendarService');

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: `${process.env.REDIS_URL}`,
      },
    });
  }

  public async getParkingAvaliability(
    getParkingCalendarInput: GetParkingCalendarInput,
  ): Promise<ParkingCalendarType[]> {
    const response = this.client.send<ParkingCalendarType[]>(
      { type: 'get-parking-avaliability' },
      getParkingCalendarInput,
    );

    return response.toPromise();
  }
}
