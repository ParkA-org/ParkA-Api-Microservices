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
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { JWTpayload } from 'src/auth-service/types/jwt.type';
import { FeatureService } from '../feature/feature.service';
import { FeatureType } from '../feature/types/feature.type';
import { CreateParkingInput } from './inputs/create-parking.input';
import { UpdateParkingInput } from './inputs/update-parking.input';
import { ParkingService } from './parking.service';
import { ParkingType } from './types/parking.type';

@Resolver(of => ParkingType)
export class ParkingResolver {
  constructor(
    private parkingService: ParkingService,
    private featureService: FeatureService,
  ) {}

  @Query(returns => ParkingType)
  public async getParkingById(@Args('id') id: string): Promise<ParkingType> {
    return this.parkingService.getParkingById(id);
  }

  @Query(returns => [ParkingType])
  @UseGuards(AuthGuard)
  public async getAllUserParkings(@Context('user') user: JWTpayload) {
    return this.parkingService.getAllMyParkings(user);
  }

  @Query(returns => [ParkingType])
  public async getAllParkings() {
    return this.parkingService.getAllParkings();
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
    return this.featureService.getFeaturesByIds(parking.features);
  }
}
