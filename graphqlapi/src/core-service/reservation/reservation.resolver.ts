import { InternalServerErrorException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetReservationByIdInput } from './inputs/get-reservation-by-id.input';
import { ReservationService } from './reservation.service';
import { ReservationType } from './types/reservation.type';

@Resolver(of => ReservationType)
export class ReservationResolver {
  constructor(private reservationService: ReservationService) {}

  @Query(returns => ReservationType)
  public async getReservationById(
    @Args('getReservationByIdInput')
    getReservationByIdInput: GetReservationByIdInput,
  ): Promise<ReservationType> {
    // throw new InternalServerErrorException('test error');
    return this.reservationService.getReservationById(getReservationByIdInput);
  }

  @Query(returns => [ReservationType])
  public async getAllReservations(): Promise<ReservationType[]> {
    return this.reservationService.getAllReservations();
  }
}
