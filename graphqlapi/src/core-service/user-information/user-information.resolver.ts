import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInformationInpuType } from './inputs/create-user-information.input';
import { GetUserInformationByIdInput } from './inputs/get-user-information-by-id.input';
import { UpdateUserInformationInput } from './inputs/update-user-information.input';
import { UserInformationType } from './types/user-information.type';
import { UserInformationService } from './user-information.service';

@Resolver(of => UserInformationType)
export class UserInformationResolver {
  constructor(private userInformationService: UserInformationService) {}

  @Query(returns => UserInformationType)
  public async getUserInformationById(
    @Args('getUserInformationByIdInput')
    getUserInformationByIdInput: GetUserInformationByIdInput,
  ): Promise<UserInformationType> {
    return await this.userInformationService.getUserInformationById(
      getUserInformationByIdInput,
    );
  }

  @Mutation(of => UserInformationType)
  public async createUserInformation(
    @Args('createUserInformationInpuType')
    createUserInformationInpuType: CreateUserInformationInpuType,
  ): Promise<UserInformationType> {
    return this.userInformationService.createUserInformation(
      createUserInformationInpuType,
    );
  }

  @Mutation(of => UserInformationType)
  public async updateUserInformation(
    @Args('updateUserInformationInput')
    updateUserInformationInput: UpdateUserInformationInput,
  ): Promise<UserInformationType> {
    return this.userInformationService.updateUserInformation(
      updateUserInformationInput,
    );
  }
}
