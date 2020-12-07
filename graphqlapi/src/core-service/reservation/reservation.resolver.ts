import {
  InternalServerErrorException,
  Logger,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from 'src/auth-service/auth.service';
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { JWTpayload } from 'src/auth-service/types/jwt.type';
import { UserType } from 'src/auth-service/types/user.type';
import { ParkingService } from 'src/parking-service/parking/parking.service';
import { ParkingType } from 'src/parking-service/parking/types/parking.type';
import { PaymentService } from 'src/payment-service/payment/payment.service';
import { PaymentType } from 'src/payment-service/payment/types/payment.type';
import { VehicleType } from 'src/vehicle-service/vehicle/types/vehicle.type';
import { VehicleService } from 'src/vehicle-service/vehicle/vehicle.service';
import { CancelReservationInput } from './inputs/cancel-reservation.input';
import { CreateReservationInternalInput } from './inputs/create-reservation-internal.input';
import { CreateReservationInput } from './inputs/create-reservation.input';
import { GetAllUserReservationsInput } from './inputs/get-all-user-reservations-as-client.input';
import { GetReservationByIdInput } from './inputs/get-reservation-by-id.input';
import { UpdateReservationInput } from './inputs/update-reservation.input';
import { ValidateUser } from './inputs/validate-user';
import { ReservationService } from './reservation.service';
import { ReservationType } from './types/reservation.type';
import { UserRoles } from './utils/user-roles';

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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Query(returns => [ReservationType])
  public async getAllReservations(): Promise<ReservationType[]> {
    this.logger.debug(`Received get all reservatios`);

    return this.reservationService.getAllReservations();
  }

  @UseGuards(AuthGuard)
  @Query(of => [ReservationType])
  public async getAllUserReservationsAsClient(
    @Context('user') user: JWTpayload,
  ): Promise<ReservationType[]> {
    this.logger.debug(`Received get all user reservations as client`);

    const getAllUserReservationsAsClientInput: GetAllUserReservationsInput = {
      id: user.id,
      role: UserRoles.Client,
    };

    return this.reservationService.getAllUserReservations(
      getAllUserReservationsAsClientInput,
    );
  }

  @UseGuards(AuthGuard)
  @Query(of => [ReservationType])
  public async getAllUserReservationsAsOwner(
    @Context('user') user: JWTpayload,
  ): Promise<ReservationType[]> {
    this.logger.debug(`Received get all user reservations as owner`);

    const getAllUserReservationsAsClientInput: GetAllUserReservationsInput = {
      id: user.id,
      role: UserRoles.Owner,
    };

    return this.reservationService.getAllUserReservations(
      getAllUserReservationsAsClientInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(of => ReservationType)
  public async createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
    @Context('user') user: JWTpayload,
  ): Promise<ReservationType> {
    this.logger.debug(
      `Received create reservation with payload ${JSON.stringify(
        createReservationInput,
      )}`,
    );

    const {
      checkInDate,
      checkOutDate,
      owner,
      parking,
      paymentInfo,
      rentDate,
      total,
      vehicle,
    } = createReservationInput;

    const createReservationInternalInput: CreateReservationInternalInput = {
      checkInDate,
      checkOutDate,
      client: user.id,
      owner,
      parking,
      paymentInfo,
      rentDate,
      total,
      vehicle,
    };

    return this.reservationService.createReservation(
      createReservationInternalInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(of => ReservationType)
  public async updateReservation(
    @Args('updateReservationInput')
    updateReservationInput: UpdateReservationInput,
    @Context('user') user: JWTpayload,
  ): Promise<ReservationType> {
    this.logger.debug(
      `Received update reservation with payload ${JSON.stringify(
        updateReservationInput,
      )}`,
    );

    return this.reservationService.updateReservation(updateReservationInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(of => ReservationType)
  public async cancelReservation(
    @Args('cancelReservationInput')
    cancelReservationInput: CancelReservationInput,
    @Context('user') user: JWTpayload,
  ): Promise<ReservationType> {
    this.logger.debug(
      `Received cancel reservation with payload ${JSON.stringify(
        cancelReservationInput,
      )}`,
    );

    const validate = new ValidateUser();
    validate.id = user.id;

    return this.reservationService.cancelReservation(
      cancelReservationInput,
      validate,
    );
  }

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
