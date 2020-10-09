import { UseGuards } from '@nestjs/common';
import { Query, Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { JWTpayload } from 'src/auth-service/types/jwt.type';
import { ParkingService } from './parking.service';
import { ParkingType } from './types/parking.type';

@Resolver(of => 'UserType')
export class ParkingResolver {
  constructor(private parkingService: ParkingService) {}

  @Query(returns => ParkingType)
  getParkingById(@Args('id') id: string) {
    return this.parkingService.getParkingById(id);
  }

  @Query(returns => [ParkingType])
  @UseGuards(AuthGuard)
  getAllMyParkings(@Context('user') user: JWTpayload) {
    return this.parkingService.getAllMyParkings(user);
  }

  @Query(returns => [ParkingType])
  getAllParkings() {
    return this.parkingService.getAllParkings();
  }

  @Mutation(returns => ParkingType)
  @UseGuards(AuthGuard)
  async updateParking(
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
  async createParking(
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
}
