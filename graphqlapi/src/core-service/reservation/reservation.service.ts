import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CancelReservationInput } from './inputs/cancel-reservation.input';
import { CreateReservationInternalInput } from './inputs/create-reservation-internal.input';
import { CreateReservationInput } from './inputs/create-reservation.input';
import { GetAllUserReservationsInput } from './inputs/get-all-user-reservations-as-client.input';
import { GetReservationByIdInput } from './inputs/get-reservation-by-id.input';
import { GetReservationsInsightsInput } from './inputs/get-reservations-insights.input';
import { UpdateReservationInput } from './inputs/update-reservation.input';
import { ValidateUser } from './inputs/validate-user';
import { ReservationType } from './types/reservation.type';
import { ReservationInsights } from './types/reservations-insights.type';

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

  public async getAllUserReservations(
    getAllUserReservationsInput: GetAllUserReservationsInput,
  ): Promise<ReservationType[]> {
    this.logger.debug(`Received get all user reservations as client`);

    const response = await this.client.send<ReservationType[]>(
      { type: 'get-all-user-reservations-as-client' },
      getAllUserReservationsInput,
    );

    return response.toPromise();
  }

  public async getUserReservationsInsights(
    getReservationInsightsInputs: GetReservationsInsightsInput,
  ): Promise<ReservationInsights> {
    this.logger.debug(
      `Received get reservations insights with payload ${JSON.stringify(
        getReservationInsightsInputs,
      )}`,
    );
    const response = await this.client.send<ReservationInsights>(
      { type: 'get-user-reservations-insigths-by-year' },
      getReservationInsightsInputs,
    );

    return response.toPromise();
  }

  public async createReservation(
    createReservationInternalInput: CreateReservationInternalInput,
  ): Promise<ReservationType> {
    this.logger.debug(
      `Received create reservation with payload ${JSON.stringify(
        createReservationInternalInput,
      )}`,
    );

    const response = await this.client.send<ReservationType>(
      { type: 'create-reservation' },
      createReservationInternalInput,
    );

    return response.toPromise();
  }

  public async updateReservation(
    updateReservationInput: UpdateReservationInput,
  ): Promise<ReservationType> {
    this.logger.debug(
      `Received update reservation with payload ${JSON.stringify(
        updateReservationInput,
      )}`,
    );

    const response = await this.client.send<ReservationType>(
      { type: 'update-reservation' },
      updateReservationInput,
    );

    return response.toPromise();
  }

  public async cancelReservation(
    cancelReservationInput: CancelReservationInput,
    user: ValidateUser,
  ): Promise<ReservationType> {
    this.logger.debug(
      `Received cancel reservation with payload ${JSON.stringify(
        cancelReservationInput,
      )}`,
    );

    const response = await this.client.send<ReservationType>(
      { type: 'cancel-reservation' },
      { cancelReservationInput, user },
    );

    return response.toPromise();
  }

  public async updateReservationReviewed(
    reservation: string,
  ): Promise<ReservationType> {
    const obj = {
      where: {
        id: reservation,
      },
      data: {
        reviewed: true,
      },
    };

    const response = await this.client.send<ReservationType>(
      { type: 'update-reservation-reviewed' },
      obj,
    );

    return response.toPromise();
  }
}
