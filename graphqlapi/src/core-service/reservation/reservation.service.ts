import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { GetReservationByIdInput } from './inputs/get-reservation-by-id.input';
import { ReservationType } from './types/reservation.type';

@Injectable()
export class ReservationService {
  private client: ClientProxy;
  private logger = new Logger('ReservationService');

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: `${process.env.REDIS_URL}`,
      },
    });
  }

  public async getReservationById(
    getReservationByIdInput: GetReservationByIdInput,
  ): Promise<ReservationType> {
    this.logger.debug(
      `Received get reservation by id with payload ${JSON.stringify(
        getReservationByIdInput,
      )}`,
    );

    const response = await this.client.send<ReservationType>(
      { type: 'get-reservation-by-id' },
      getReservationByIdInput,
    );

    return response.toPromise();
  }

  public async getAllReservations(): Promise<ReservationType[]> {
    this.logger.debug(`Received get all reservatios`);

    const response = await this.client.send<ReservationType[]>(
      { type: 'get-all-reservations' },
      {},
    );

    return response.toPromise();
  }
}
