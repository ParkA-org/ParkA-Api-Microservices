import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
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

  public async getAllReservations(): Promise<ReservationType[]> {
    const response = await this.client.send<ReservationType[]>(
      { type: 'get-all-reservations' },
      {},
    );

    return response.toPromise();
  }
}
