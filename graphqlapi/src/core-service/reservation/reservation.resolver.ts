import { InternalServerErrorException, Logger } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from 'src/auth-service/auth.service';
import { UserType } from 'src/auth-service/types/user.type';
import { ParkingService } from 'src/parking-service/parking/parking.service';
import { ParkingType } from 'src/parking-service/parking/types/parking.type';
import { PaymentService } from 'src/payment-service/payment/payment.service';
import { PaymentType } from 'src/payment-service/payment/types/payment.type';
import { VehicleType } from 'src/vehicle-service/vehicle/types/vehicle.type';
import { VehicleService } from 'src/vehicle-service/vehicle/vehicle.service';
import { CancelReservationInput } from './inputs/cancel-reservation.input';
import { CreateReservationInput } from './inputs/create-reservation.input';
import { GetReservationByIdInput } from './inputs/get-reservation-by-id.input';
import { UpdateReservationInput } from './inputs/update-reservation.input';
import { ReservationService } from './reservation.service';
import { ReservationType } from './types/reservation.type';

@Resolver(of => ReservationType)
export class ReservationResolver {
  private logger = new Logger('ReservationResolver');

  constructor(
    private reservationService: ReservationService,
    private readonly vehicleService: VehicleService,
    private readonly paymentService: PaymentService,
    private readonly parkingService: ParkingService,
    private readonly userService: AuthService,
  ) {}

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
      `Received create reservation with payload ${JSON.stringify(
        createReservationInput,
      )}`,
    );

    return this.reservationService.createReservation(createReservationInput);
  }

  @Mutation(of => ReservationType)
  public async updateReservation(
    @Args('updateReservationInput')
    updateReservationInput: UpdateReservationInput,
  ): Promise<ReservationType> {
    this.logger.debug(
      `Received update reservation with payload ${JSON.stringify(
        updateReservationInput,
      )}`,
    );

    return this.reservationService.updateReservation(updateReservationInput);
  }

  @Mutation(of => ReservationType)
  public async cancelReservation(
    @Args('cancelReservationInput')
    cancelReservationInput: CancelReservationInput,
  ): Promise<ReservationType> {
    this.logger.debug(
      `Received cancel reservation with payload ${JSON.stringify(
        cancelReservationInput,
      )}`,
    );

    return this.reservationService.cancelReservation(cancelReservationInput);
  }

  //Field Resolvers
  @ResolveField(of => VehicleType)
  public async vehicle(
    @Parent() reservation: ReservationType,
  ): Promise<VehicleType> {
    return this.vehicleService.getVehicleById({ id: reservation.vehicle });
  }

  @ResolveField(of => PaymentType)
  public async paymentInfo(
    @Parent() reservation: ReservationType,
  ): Promise<PaymentType> {
    return this.paymentService.getPaymentById({ id: reservation.paymentInfo });
  }

  @ResolveField(of => ParkingType)
  public async parking(
    @Parent() reservation: ReservationType,
  ): Promise<ParkingType> {
    return this.parkingService.getParkingById(reservation.parking);
  }

  @ResolveField(of => UserType)
  public async owner(
    @Parent() reservation: ReservationType,
  ): Promise<UserType> {
    return this.userService.getUserById(reservation.owner);
  }

  @ResolveField(of => UserType)
  public async client(
    @Parent() reservation: ReservationType,
  ): Promise<UserType> {
    return this.userService.getUserById(reservation.client);
  }
}
