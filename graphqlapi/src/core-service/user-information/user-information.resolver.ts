import { Logger, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { JWTpayload } from 'src/auth-service/types/jwt.type';
import { ParkingService } from 'src/parking-service/parking/parking.service';
import { ParkingType } from 'src/parking-service/parking/types/parking.type';
import { PaymentService } from 'src/payment-service/payment/payment.service';
import { PaymentType } from 'src/payment-service/payment/types/payment.type';
import { VehicleType } from 'src/vehicle-service/vehicle/types/vehicle.type';
import { VehicleService } from 'src/vehicle-service/vehicle/vehicle.service';
import { CountryService } from '../country/country.service';
import { CountryType } from '../country/types/country.type';
import { NationalityService } from '../nationality/nationality.service';
import { NationalityType } from '../nationality/types/nationality.type';
import { CreateUserInformationInpuType } from './inputs/create-user-information.input';
import { GetUserInformationByIdInput } from './inputs/get-user-information-by-id.input';
import { UpdateUserInformationInternalInput } from './inputs/update-user-information-internal-input';
import { UpdateUserInformationInput } from './inputs/update-user-information.input';
import { UserInformationType } from './types/user-information.type';
import { UserInformationService } from './user-information.service';

@Resolver(of => UserInformationType)
export class UserInformationResolver {
  private logger = new Logger('UserInformationResolver');

  constructor(
    private userInformationService: UserInformationService,
    private paymentService: PaymentService,
    private countryService: CountryService,
    private nationalityService: NationalityService,
    private parkingsService: ParkingService,
    private vehicleService: VehicleService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(returns => UserInformationType)
  public async getUserInformationById(
    @Context('user') user: JWTpayload,
  ): Promise<UserInformationType> {
    this.logger.debug(`Received get user information by id with payload `);

    const getUserInformationByIdInput: GetUserInformationByIdInput = {
      id: user.userInformation,
    };

    return await this.userInformationService.getUserInformationById(
      getUserInformationByIdInput,
    );
  }

  @Mutation(of => UserInformationType)
  public async createUserInformation(
    @Args('createUserInformationInpuType')
    createUserInformationInpuType: CreateUserInformationInpuType,
  ): Promise<UserInformationType> {
    this.logger.debug(
      `Received create user information with payload ${JSON.stringify(
        createUserInformationInpuType,
      )}`,
    );

    return this.userInformationService.createUserInformation(
      createUserInformationInpuType,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(of => UserInformationType)
  public async updateUserInformation(
    @Args('updateUserInformationInput')
    updateUserInformationInput: UpdateUserInformationInput,
    @Context('user') user: JWTpayload,
  ): Promise<UserInformationType> {
    this.logger.debug(
      `Received update user information with payload ${JSON.stringify(
        updateUserInformationInput,
      )}`,
    );

    const updateUserInformationInternalInput: UpdateUserInformationInternalInput = {
      getUserInformationByIdPayload: {
        id: user.userInformation,
      },
      updateUserInformationPayload: updateUserInformationInput,
    };

    return this.userInformationService.updateUserInformation(
      updateUserInformationInternalInput,
    );
  }

  //Field resolvers
  @ResolveField(returns => PaymentType)
  public async paymentInformation(
    @Parent() userInformation: UserInformationType,
  ): Promise<PaymentType> {
    return this.paymentService.getPaymentById({
      id: userInformation.paymentInformation,
    });
  }

  @ResolveField(returns => CountryType)
  public async placeOfBirth(
    @Parent() userInformation: UserInformationType,
  ): Promise<CountryType> {
    return this.countryService.getCountryById({
      id: userInformation.placeOfBirth,
    });
  }

  @ResolveField(returns => NationalityType)
  public async nationality(
    @Parent() userInformation: UserInformationType,
  ): Promise<NationalityType> {
    return this.nationalityService.getNationalityById({
      id: userInformation.nationality,
    });
  }

  @ResolveField(returns => [ParkingType])
  public async parkings(
    @Parent() userInformation: UserInformationType,
  ): Promise<ParkingType[]> {
    return this.parkingsService.getAllUserParkings({
      userInformationId: userInformation.id,
    });
  }

  @ResolveField(returns => [VehicleType])
  public async vehicles(
    @Parent() userInformation: UserInformationType,
  ): Promise<VehicleType[]> {
    return this.vehicleService.getAllUserVehicles({
      userInformationId: userInformation.id,
    });
  }
}
