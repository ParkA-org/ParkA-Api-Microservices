import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';

import { AuthServiceService } from './auth-service.service';
import { CreateUserInput, LoginUserInput } from './user-input/user.input';
import { LoginType } from './user-type/login.type';
import { UserType } from './user-type/user.type';

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

  @Mutation(returns => LoginType)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<LoginType> {
    return await this.authServiceService.login(loginUserInput);
  }
}
