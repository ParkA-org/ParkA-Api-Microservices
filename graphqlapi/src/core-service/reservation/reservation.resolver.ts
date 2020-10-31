import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CancelReservationInput } from './inputs/cancel-reservation.input';
import { CreateReservationInput } from './inputs/create-reservation.input';
import { GetReservationByIdInput } from './inputs/get-reservation-by-id.input';
import { UpdateReservationInput } from './inputs/update-reservation.input';
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

  @Mutation(of => ReservationType)
  public async createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ): Promise<ReservationType> {
    this.logger.debug(
      `Received create reservation with payload ${createReservationInput}`,
    );

    return this.reservationService.createReservation(createReservationInput);
  }

  @Mutation(of => ReservationType)
  public async updateReservation(
    @Args('updateReservationInput')
    updateReservationInput: UpdateReservationInput,
  ): Promise<ReservationType> {
    this.logger.debug(
      `Received update reservation with payload ${updateReservationInput}`,
    );

    return this.reservationService.updateReservation(updateReservationInput);
  }

  @Mutation(of => ReservationType)
  public async cancelReservation(
    @Args('cancelReservationInput')
    cancelReservationInput: CancelReservationInput,
  ): Promise<ReservationType> {
    this.logger.debug(
      `Received cancel reservation with payload ${cancelReservationInput}`,
    );

    return this.reservationService.cancelReservation(cancelReservationInput);
  }
}
