import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';

import { AuthServiceService } from './auth-service.service';
import { CreateUserInput, LoginUserInput } from './user-data/user.input';
import { UserType } from './user-data/user.type';

@Resolver(of => UserType)
export class AuthServiceResolver {
  constructor(private authServiceService: AuthServiceService) {}

  @Query(returns => UserType)
  user(@Args('id') id: string) {
    return this.authServiceService.getUserById(id);
  }

  @Query(returns => [UserType])
  users() {
    return this.authServiceService.getAllUsers();
  }

  @Mutation(returns => UserType)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserType> {
    return await this.authServiceService.createUser(createUserInput);
  }

  @Mutation(returns => UserType)
  async singIn(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<UserType> {
    return await this.authServiceService.singIn(loginUserInput);
  }
}
