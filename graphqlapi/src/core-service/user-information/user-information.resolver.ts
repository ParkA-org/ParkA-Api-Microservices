import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetUserInformationByIdInput } from './inputs/get-user-information-by-id.input';
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
}
