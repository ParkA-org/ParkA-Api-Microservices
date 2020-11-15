import { UseGuards } from '@nestjs/common';
import {
  Query,
  Resolver,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthService } from 'src/auth-service/auth.service';
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { JWTpayload } from 'src/auth-service/types/jwt.type';
import { UserType } from 'src/auth-service/types/user.type';
import { UserInformationService } from 'src/core-service/user-information/user-information.service';
import { CalendarService } from '../calendar/calendar.service';
import { CalendarType } from '../calendar/types/calendar.type';
import { FeatureService } from '../feature/feature.service';
import { FeatureType } from '../feature/types/feature.type';
import { CreateParkingInput } from './inputs/create-parking.input';
import { FilterInput } from './inputs/filter.input';
import { UpdateParkingInput } from './inputs/update-parking.input';
import { ParkingService } from './parking.service';
import { ParkingType } from './types/parking.type';

@Resolver(of => ParkingType)
export class ParkingResolver {
  constructor(
    private parkingService: ParkingService,
    private featureService: FeatureService,
    private calendarService: CalendarService,
  ) {}

  @Query(returns => ParkingType)
  public async getParkingById(@Args('id') id: string): Promise<ParkingType> {
    return this.parkingService.getParkingById(id);
  }

  @Query(returns => [ParkingType])
  @UseGuards(AuthGuard)
  public async getAllUserParkings(@Context('user') user: JWTpayload) {
    const getAllUserParkingsInternalInput = {
      userInformationId: user.userInformation,
    };

    const result = await this.parkingService.getAllUserParkings(
      getAllUserParkingsInternalInput,
    );

    return result;
  }

  @Query(returns => [ParkingType])
  public async getAllParkings(
    @Args('input', { nullable: true }) filterInput: FilterInput,
  ) {
    return this.parkingService.getAllParkings(filterInput);
  }

  @Mutation(returns => ParkingType)
  @UseGuards(AuthGuard)
  public async updateParking(
    @Args('updateParkingInput')
    updateParkingInput: UpdateParkingInput,
    @Context('user') user: JWTpayload,
  ): Promise<ParkingType> {
    const updateParking = await this.parkingService.updateParking(
      updateParkingInput,
      user,
    );
    return updateParking;
  }

  @Mutation(returns => ParkingType)
  @UseGuards(AuthGuard)
  public async createParking(
    @Args('createParkingInput')
    createParkingInput: CreateParkingInput,
    @Context('user') user: JWTpayload,
  ): Promise<ParkingType> {
    const createParking = await this.parkingService.createParking(
      createParkingInput,
      user,
    );
    return createParking;
  }

  //Resolvers
  @ResolveField(returns => [FeatureType])
  public async features(
    @Parent() parking: ParkingType,
  ): Promise<FeatureType[]> {
    return await this.featureService.getFeaturesByIds(parking.features);
  }

  @ResolveField(returns => [FeatureType])
  public async user(@Parent() parking: ParkingType): Promise<UserType> {
    return await this.parkingService.getUserByUserInformation(
      parking.userInformation,
    );
  }

  @ResolveField(returns => [CalendarType])
  public async calendar(@Parent() parking: ParkingType): Promise<CalendarType> {
    return this.calendarService.getCalendarById({ id: parking.calendar });
  }
}
