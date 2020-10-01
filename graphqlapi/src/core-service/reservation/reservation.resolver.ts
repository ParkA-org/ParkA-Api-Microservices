import { Query, Resolver } from '@nestjs/graphql';
import { ReservationService } from './reservation.service';
import { ReservationType } from './types/reservation.type';

@Resolver(of => ReservationType)
export class ReservationResolver {
  constructor(private reservationService: ReservationService) {}

  @Query(retuns => [ReservationType])
  public async getAllReservations(): Promise<ReservationType[]> {
    return this.reservationService.getAllReservations();
  }
}
