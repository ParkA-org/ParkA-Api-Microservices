import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CancelReservationInput } from './inputs/cancel-reservation.input';
import { CreateReservationInput } from './inputs/create-reservation.input';
import { GetReservationByIdInput } from './inputs/get-reservation-by-id.input';
import { UpdateReservationInput } from './inputs/update-reservation.input';
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

  public async createReservation(
    createReservationInput: CreateReservationInput,
  ): Promise<ReservationType> {
    this.logger.debug(`Received create reservation`);

    const response = await this.client.send<ReservationType>(
      { type: 'create-reservation' },
      createReservationInput,
    );

    return response.toPromise();
  }

  public async updateReservation(
    updateReservationInput: UpdateReservationInput,
  ): Promise<ReservationType> {
    this.logger.debug(`Received update reservation with payload`);

    const response = await this.client.send<ReservationType>(
      { type: 'update-reservation' },
      updateReservationInput,
    );

    return response.toPromise();
  }

  public async cancelReservation(
    cancelReservationInput: CancelReservationInput,
  ): Promise<ReservationType> {
    this.logger.debug(
      `Received cancel reservation with payload ${cancelReservationInput}`,
    );

    const response = await this.client.send<ReservationType>(
      { type: 'cancel-reservation' },
      cancelReservationInput,
    );

    return response.toPromise();
  }
}
