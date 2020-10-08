import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Query, Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { ParkingService } from './parking.service';

@Resolver(of => 'UserType')
export class ParkingResolver {
  constructor(private parkingService: ParkingService) {}

  @Query(returns => UserType)
  @UseGuards(AuthGuard)
  getUserById(@Args('id') id: string) {
    return this.authService.getUserById(id);
  }

  @Query(returns => [UserType])
  @UseGuards(AuthGuard)
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Mutation(returns => UserType)
  @UseGuards(AuthGuard)
  async updateUserPassword(
    @Args('updateUserPasswordInput')
    updateUserPasswordInput: UpdateUserPasswordInput,
    @Context('user') user: JWTpayload,
  ): Promise<UserType> {
    const updateUser = await this.authService.updateUserPassword(
      updateUserPasswordInput,
      user,
    );
    return updateUser;
  }
}
