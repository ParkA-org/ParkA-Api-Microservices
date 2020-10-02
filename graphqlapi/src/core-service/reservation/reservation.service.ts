import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { GetReservationByIdInput } from './inputs/get-reservation-by-id.input';
import { ReservationType } from './types/reservation.type';

@Injectable()
export class ReservationService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://redis-parka-microservices:6379`,
    },
  })
  private client: ClientProxy;

  public async getReservationById(
    getReservationByIdInput: GetReservationByIdInput,
  ): Promise<ReservationType> {
    const response = await this.client.send<ReservationType>(
      { type: 'get-reservation-by-id' },
      getReservationByIdInput,
    );

    return response.toPromise();
  }

  public async getAllReservations(): Promise<ReservationType[]> {
    const response = await this.client.send<ReservationType[]>(
      { type: 'get-all-reservations' },
      {},
    );

    return response.toPromise();
  }
}
