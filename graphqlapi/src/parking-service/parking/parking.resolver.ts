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
  @UseGuards(AuthGuard)
  getParkingById(@Args('id') id: string, @Context('user') user: JWTpayload) {
    return this.parkingService.getParkingById(id, user);
  }

  @Query(returns => ParkingType)
  @UseGuards(AuthGuard)
  getAllMyParkings(@Context('user') user: JWTpayload) {
    return this.parkingService.getAllMyParkings(user);
  }

  @Query(returns => [ParkingType])
  @UseGuards(AuthGuard)
  getAllParkings() {
    return this.parkingService.getAllParkings();
  }

  @Mutation(returns => ParkingType)
  @UseGuards(AuthGuard)
  async updateParking(
    @Args('updateUserPasswordInput')
    UpdateParkingInput: UpdateParkingInput,
    @Context('user') user: JWTpayload,
  ): Promise<ParkingType> {
    const updateUser = await this.parkingService.updateParking(
      UpdateParkingInput,
      user,
    );
    return updateUser;
  }
}
