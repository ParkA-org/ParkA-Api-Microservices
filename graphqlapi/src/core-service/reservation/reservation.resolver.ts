import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetReservationByIdInput } from './inputs/get-reservation-by-id.input';
import { ReservationService } from './reservation.service';
import { ReservationType } from './types/reservation.type';

@Resolver(of => ReservationType)
export class ReservationResolver {
  private logger = new Logger('ReservationResolver');

  constructor(private reservationService: ReservationService) {}

  @Query(returns => ReservationType)
  public async getReservationById(
    @Args('getReservationByIdInput')
    getReservationByIdInput: GetReservationByIdInput,
  ): Promise<ReservationType> {
    this.logger.debug(
      `Received get reservation by id with payload ${JSON.stringify(
        getReservationByIdInput,
      )}`,
    );

    return this.reservationService.getReservationById(getReservationByIdInput);
  }

  @Query(returns => [ReservationType])
  public async getAllReservations(): Promise<ReservationType[]> {
    this.logger.debug(`Received get all reservatios`);

    return this.reservationService.getAllReservations();
  }
}
